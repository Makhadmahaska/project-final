import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

import FeedbackForm from "./components/feedbackForm";
import ThemeToggle from "./components/DarkTheme";
import { auth } from "./firebase/firebase";
import useDarkMode from "./hooks/userDarkMode";

type StoredFeedback = {
  id: number;
  name: string;
  email: string;
  category: string;
  rating: number;
  message: string;
  notify: boolean;
  createdAt: string;
};

const ENV_API_BASE_URL = import.meta.env.VITE_API_URL?.trim();

function getProtectedFeedbackUrl() {
  if (ENV_API_BASE_URL) {
    return `${ENV_API_BASE_URL}/api/feedback`;
  }

  return "/api/feedback";
}

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState<StoredFeedback[]>([]);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    async function loadFeedback(currentUser: User) {
      try {
        setIsLoadingFeedback(true);
        setDashboardError("");
        const token = await currentUser.getIdToken();
        const response = await fetch(getProtectedFeedbackUrl(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = (await response.json()) as {
          success: boolean;
          data?: StoredFeedback[];
          message?: string;
        };

        if (!response.ok || !payload.success) {
          throw new Error(payload.message ?? "Could not load feedback.");
        }

        setFeedbackItems(payload.data ?? []);
      } catch (error) {
        setDashboardError(
          error instanceof Error ? error.message : "Could not load feedback."
        );
      } finally {
        setIsLoadingFeedback(false);
      }
    }

    if (!user) {
      setFeedbackItems([]);
      return;
    }

    void loadFeedback(user);
  }, [user]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSigningIn(true);
      setAuthError("");
      await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Could not sign in."
      );
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  const panelClass = `rounded-2xl border p-6 shadow-sm transition-colors ${
    isDarkMode
      ? "border-slate-700 bg-slate-900/80"
      : "border-slate-200 bg-white"
  }`;

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-[#111827] text-white" : "bg-[#f3f4f6] text-slate-900"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                isDarkMode ? "text-orange-300" : "text-orange-500"
              }`}
            >
              Final Project
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Feedback Tracker Pro
            </h1>
            <p
              className={`max-w-2xl text-sm sm:text-base ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Public users can submit feedback, and admins can sign in with
              Firebase to review the protected dashboard.
            </p>
          </div>

          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>

        <div className="mx-auto grid w-full max-w-4xl gap-8 xl:grid-cols-[minmax(0,540px),1fr]">
          <div>
            <FeedbackForm isDarkMode={isDarkMode} />
          </div>

          <section className={`${panelClass} space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Feedback Review</h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Sign in with Firebase to access protected feedback data from the
                backend API.
              </p>
            </div>

            {!user ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold" htmlFor="admin-email">
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                      isDarkMode
                        ? "border-slate-600 bg-slate-800 text-white"
                        : "border-slate-300 bg-white text-slate-900"
                    }`}
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="admin-password"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                      isDarkMode
                        ? "border-slate-600 bg-slate-800 text-white"
                        : "border-slate-300 bg-white text-slate-900"
                    }`}
                    placeholder="Your Firebase password"
                    required
                  />
                </div>

                {authError ? (
                  <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {authError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-500"
                >
                  {isSigningIn ? "Signing in..." : "Sign in to Dashboard"}
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold">Signed in</p>
                    <p className="text-sm opacity-80">{user.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-lg border border-current px-4 py-2 text-sm font-semibold"
                  >
                    Sign out
                  </button>
                </div>

                {dashboardError ? (
                  <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {dashboardError}
                  </p>
                ) : null}

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Submitted Feedback</h3>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {feedbackItems.length} items
                  </span>
                </div>

                {isLoadingFeedback ? (
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Loading dashboard...
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {feedbackItems.length === 0 ? (
                      <div
                        className={`rounded-xl border border-dashed p-5 text-sm ${
                          isDarkMode
                            ? "border-slate-700 text-slate-400"
                            : "border-slate-300 text-slate-500"
                        }`}
                      >
                        Submitted feedback will appear here.
                      </div>
                    ) : (
                      feedbackItems.map((item) => (
                        <article
                          key={item.id}
                          className={`rounded-xl border p-4 ${
                            isDarkMode
                              ? "border-slate-700 bg-slate-800/70"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p
                                className={`text-sm ${
                                  isDarkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                              >
                                {item.email}
                              </p>
                            </div>

                            <div className="text-sm font-medium">
                              {item.category} · {item.rating}/5
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-6">{item.message}</p>

                          <div
                            className={`mt-3 flex flex-wrap gap-3 text-xs ${
                              isDarkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            <span>{new Date(item.createdAt).toLocaleString()}</span>
                            <span>Notify: {item.notify ? "Yes" : "No"}</span>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
