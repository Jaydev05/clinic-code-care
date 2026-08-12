import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, ApiError, type AppointmentRecord } from "@/lib/api";
import { site } from "@/data/site";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Login | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content: "Secure staff area to manage appointment requests and patient feedback.",
      },
      { property: "og:title", content: "Staff Login | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Hospital staff sign in for appointments and feedback." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const queryClient = useQueryClient();
  const session = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      try {
        return await api.me();
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
      }
    },
    retry: false,
  });

  if (session.isLoading) {
    return (
      <div className="section-y container-page text-sm text-muted-foreground">Checking your session…</div>
    );
  }

  if (!session.data) {
    return <LoginCard onSuccess={() => queryClient.invalidateQueries({ queryKey: ["admin-me"] })} />;
  }

  return <Dashboard username={session.data.username} />;
}

function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await api.login(username, password);
      toast.success("Signed in");
      onSuccess();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section-y">
      <div className="container-page flex justify-center">
        <form onSubmit={submit} className="card-surface w-full max-w-md space-y-5 p-7">
          <div>
            <h1 className="font-display text-xl font-semibold text-primary">Staff sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {site.shortName} — appointment and feedback desk.
            </p>
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              className="mt-1.5"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1.5"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="hero" size="lg" disabled={busy} className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
}

const statuses: AppointmentRecord["status"][] = ["new", "confirmed", "completed", "cancelled"];

function Dashboard({ username }: { username: string }) {
  const queryClient = useQueryClient();

  const appointments = useQuery({ queryKey: ["admin-appointments"], queryFn: api.listAppointments });
  const feedback = useQuery({ queryKey: ["admin-feedback"], queryFn: api.listFeedback });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: AppointmentRecord["status"] }) =>
      api.updateAppointmentStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-appointments"] }),
    onError: () => toast.error("Could not update the appointment"),
  });

  const setApproval = useMutation({
    mutationFn: ({ id, isApproved }: { id: number; isApproved: boolean }) =>
      api.setFeedbackApproval(id, isApproved),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-feedback"] }),
    onError: () => toast.error("Could not update the feedback"),
  });

  const removeFeedback = useMutation({
    mutationFn: (id: number) => api.deleteFeedback(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-feedback"] }),
    onError: () => toast.error("Could not delete the feedback"),
  });

  const signOut = async () => {
    await api.logout();
    queryClient.clear();
    queryClient.invalidateQueries({ queryKey: ["admin-me"] });
  };

  return (
    <section className="section-y">
      <div className="container-page space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-primary">Hospital desk</h1>
            <p className="text-sm text-muted-foreground">Signed in as {username}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>

        <Tabs defaultValue="appointments">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6 space-y-4">
            {appointments.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {appointments.data?.length === 0 && (
              <p className="text-sm text-muted-foreground">No appointment requests yet.</p>
            )}
            {appointments.data?.map((a) => (
              <article key={a.id} className="card-surface space-y-2 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold text-primary">{a.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.phone}
                      {a.email ? ` · ${a.email}` : ""}
                    </p>
                  </div>
                  <select
                    className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                    value={a.status}
                    onChange={(e) =>
                      setStatus.mutate({ id: a.id, status: e.target.value as AppointmentRecord["status"] })
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-foreground">
                  Preferred: {a.preferredDate}
                  {a.preferredTime ? ` at ${a.preferredTime}` : ""}
                  {a.serviceKey ? ` · ${a.serviceKey}` : ""}
                </p>
                {a.message && <p className="text-sm text-muted-foreground">{a.message}</p>}
              </article>
            ))}
          </TabsContent>

          <TabsContent value="feedback" className="mt-6 space-y-4">
            {feedback.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {feedback.data?.length === 0 && (
              <p className="text-sm text-muted-foreground">No feedback submitted yet.</p>
            )}
            {feedback.data?.map((f) => (
              <article key={f.id} className="card-surface space-y-2 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold text-primary">{f.name}</p>
                    <p className="text-sm text-muted-foreground">{"★".repeat(f.rating)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={f.isApproved ? "outline" : "default"}
                      onClick={() => setApproval.mutate({ id: f.id, isApproved: !f.isApproved })}
                    >
                      {f.isApproved ? "Unpublish" : "Approve"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => removeFeedback.mutate(f.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{f.message}</p>
              </article>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
