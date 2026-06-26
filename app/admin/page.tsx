"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../src/lib/supabase";
import { BRAND } from "../../src/config/brand";

type Application = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  license_number: string | null;
  website: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

type Bundle = {
  id: string;
  project_name: string;
  contact_email: string;
  products: any[];
  total_price: string | null;
  message: string | null;
  created_at: string;
};

type Vendor = {
  name: string;
  productCount: number;
  revenue: number;
};

type DashboardData = {
  applications: Application[];
  bundles: Bundle[];
  orders: { totalOrders: number; totalRevenue: number };
  vendors: Vendor[];
};

type ApproveResult = { loginLink: string | null };

const statusColor: Record<string, string> = {
  pending: "#b45309",
  approved: "#166534",
  rejected: "#991b1b",
};

const statusBg: Record<string, string> = {
  pending: "#fef3c7",
  approved: "#dcfce7",
  rejected: "#fee2e2",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [approveResult, setApproveResult] = useState<ApproveResult | null>(null);
  const [approvedName, setApprovedName] = useState("");

  async function fetchDashboard(token: string) {
    const res = await fetch("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    setData(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      const [{ data: userData }, { data: sessionData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);
      if (
        !userData.user ||
        userData.user.user_metadata?.role !== "admin" ||
        !sessionData.session
      ) {
        router.replace("/admin/login");
        return;
      }
      await fetchDashboard(sessionData.session.access_token);
    }
    init();
  }, [router]);

  async function withToken(fn: (token: string) => Promise<void>) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.replace("/admin/login"); return; }
    await fn(session.access_token);
  }

  async function handleApprove(app: Application) {
    setActionLoading(app.id);
    await withToken(async (token) => {
      const res = await fetch("/api/admin/approve-designer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          applicationId: app.id,
          email: app.email,
          name: app.name,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setApprovedName(app.name);
        setApproveResult({ loginLink: result.loginLink });
        await fetchDashboard(token);
      }
    });
    setActionLoading(null);
  }

  async function handleReject(app: Application) {
    setActionLoading(app.id);
    await withToken(async (token) => {
      await fetch("/api/admin/reject-designer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationId: app.id }),
      });
      await fetchDashboard(token);
    });
    setActionLoading(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading || !data) {
    return (
      <main style={{ fontFamily: "sans-serif", padding: "32px" }}>
        <p style={{ color: "#999" }}>Loading…</p>
      </main>
    );
  }

  const pendingApps = data.applications.filter((a) => a.status === "pending");

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "36px",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
            Platform Owner
          </p>
          <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>
            {BRAND.name} Admin
          </h1>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "#666",
            border: "1px solid #ddd",
            padding: "10px 20px",
            borderRadius: "6px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>

      {/* APPROVE RESULT BANNER */}
      {approveResult && (
        <div
          style={{
            background: "#dcfce7",
            border: "1px solid #166534",
            borderRadius: "8px",
            padding: "16px 20px",
            marginBottom: "32px",
          }}
        >
          <p style={{ fontWeight: 600, margin: "0 0 8px", color: "#166534" }}>
            ✓ {approvedName} approved — account created
          </p>
          {approveResult.loginLink ? (
            <>
              <p style={{ fontSize: "13px", color: "#166534", margin: "0 0 6px" }}>
                Send this one-time login link to the designer:
              </p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  readOnly
                  value={approveResult.loginLink}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    border: "1px solid #166534",
                    borderRadius: "6px",
                    fontSize: "12px",
                    background: "white",
                  }}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(approveResult.loginLink!);
                  }}
                  style={{
                    padding: "8px 14px",
                    background: "#166534",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Copy
                </button>
              </div>
            </>
          ) : (
            <p style={{ fontSize: "13px", color: "#166534", margin: 0 }}>
              Send them a password reset from your Supabase dashboard.
            </p>
          )}
          <button
            onClick={() => setApproveResult(null)}
            style={{
              marginTop: "12px",
              background: "none",
              border: "none",
              color: "#166534",
              fontSize: "12px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* STATS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {[
          { label: "Total Orders", value: data.orders.totalOrders },
          {
            label: "Total Revenue",
            value: `${data.orders.totalRevenue.toFixed(2)} SAR`,
            small: true,
          },
          { label: "Pending Applications", value: pendingApps.length },
          { label: "Bundle Requests", value: data.bundles.length },
        ].map(({ label, value, small }) => (
          <div
            key={label}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: small ? "18px" : "28px",
                fontWeight: 600,
                margin: "0 0 4px",
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* DESIGNER APPLICATIONS */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
          Designer Applications
        </h2>
        {data.applications.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>No applications yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr>
                  {["Name", "Email", "Company", "License", "Date", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          borderBottom: "2px solid #eee",
                          fontWeight: 600,
                          color: "#444",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data.applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500 }}>
                      {app.name}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#666" }}>
                      {app.email}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#666" }}>
                      {app.company ?? "—"}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#666" }}>
                      {app.license_number ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: "#999",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          background: statusBg[app.status] ?? "#f5f5f5",
                          color: statusColor[app.status] ?? "#444",
                          padding: "2px 10px",
                          borderRadius: "99px",
                          fontSize: "12px",
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {app.status === "pending" && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handleApprove(app)}
                            disabled={actionLoading === app.id}
                            style={{
                              background: "#166534",
                              color: "white",
                              border: "none",
                              padding: "5px 12px",
                              borderRadius: "5px",
                              fontSize: "12px",
                              cursor: actionLoading === app.id ? "not-allowed" : "pointer",
                              opacity: actionLoading === app.id ? 0.6 : 1,
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(app)}
                            disabled={actionLoading === app.id}
                            style={{
                              background: "#991b1b",
                              color: "white",
                              border: "none",
                              padding: "5px 12px",
                              borderRadius: "5px",
                              fontSize: "12px",
                              cursor: actionLoading === app.id ? "not-allowed" : "pointer",
                              opacity: actionLoading === app.id ? 0.6 : 1,
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* VENDORS */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
          Vendors
        </h2>
        {data.vendors.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>No vendors found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {data.vendors.map((v) => (
              <div
                key={v.name}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "16px 20px",
                }}
              >
                <p style={{ fontWeight: 600, margin: "0 0 4px" }}>{v.name}</p>
                <p style={{ fontSize: "12px", color: "#999", margin: "0 0 2px" }}>
                  {v.productCount} product{v.productCount !== 1 ? "s" : ""}
                </p>
                {v.revenue > 0 && (
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                    {v.revenue.toFixed(2)} SAR revenue
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BUNDLE REQUESTS */}
      <section>
        <h2 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
          Bundle Requests
        </h2>
        {data.bundles.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>No bundle requests yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.bundles.map((b) => (
              <div
                key={b.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, margin: "0 0 2px" }}>
                      {b.project_name}
                    </p>
                    <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                      {b.contact_email}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 600, margin: "0 0 2px" }}>
                      {b.total_price ?? "—"}
                    </p>
                    <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                      {new Date(b.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(b.products as any[]).map((p, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#f5f5f5",
                        padding: "3px 10px",
                        borderRadius: "99px",
                        fontSize: "12px",
                        color: "#444",
                      }}
                    >
                      {p.title} ×{p.quantity}
                    </span>
                  ))}
                </div>
                {b.message && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      margin: "8px 0 0",
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{b.message}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
