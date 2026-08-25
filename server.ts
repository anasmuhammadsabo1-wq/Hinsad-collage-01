import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser, getUserByUid, getUsers } from "./src/db/users.ts";
import { 
  createApplication, 
  getApplicationByNumber, 
  getAllApplications, 
  createInquiry, 
  getAllInquiries, 
  getAllAnnouncements, 
  getStudentResultByReg 
} from "./src/db/queries.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "HINSAD College API" });
  });

  // User auth sync
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || "";
      const { displayName, role } = req.body || {};
      if (!uid) {
        return res.status(400).json({ error: "Missing UID in token" });
      }
      const user = await getOrCreateUser(uid, email, displayName, role);
      res.json({ success: true, user });
    } catch (error: any) {
      console.error("Auth sync error:", error);
      res.status(500).json({ error: error.message || "Failed to sync user" });
    }
  });

  // Get current user profile
  app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(400).json({ error: "Missing UID" });
      }
      const user = await getUserByUid(uid);
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch user" });
    }
  });

  // Get all users (Admin/Staff)
  app.get("/api/users", requireAuth, async (req: AuthRequest, res) => {
    try {
      const allUsers = await getUsers();
      res.json({ users: allUsers });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
  });

  // Admission application submission
  app.post("/api/applications", async (req, res) => {
    try {
      const application = await createApplication(req.body);
      res.status(201).json({ success: true, application });
    } catch (error: any) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: error.message || "Failed to create application" });
    }
  });

  // Check application status by Application ID
  app.get("/api/applications/:applicationNumber", async (req, res) => {
    try {
      const application = await getApplicationByNumber(req.params.applicationNumber);
      if (!application) {
        return res.status(404).json({ error: "Application record not found" });
      }
      res.json({ application });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch application" });
    }
  });

  // Get all applications (Admin / Staff)
  app.get("/api/applications", requireAuth, async (req: AuthRequest, res) => {
    try {
      const allApplications = await getAllApplications();
      res.json({ applications: allApplications });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch applications" });
    }
  });

  // Submit contact inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = await createInquiry(req.body);
      res.status(201).json({ success: true, inquiry });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to submit inquiry" });
    }
  });

  // Get inquiries (Admin)
  app.get("/api/inquiries", requireAuth, async (req: AuthRequest, res) => {
    try {
      const allInquiries = await getAllInquiries();
      res.json({ inquiries: allInquiries });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch inquiries" });
    }
  });

  // Get announcements
  app.get("/api/announcements", async (req, res) => {
    try {
      const allAnnouncements = await getAllAnnouncements();
      res.json({ announcements: allAnnouncements });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch announcements" });
    }
  });

  // Verify student examination result / transcript
  app.get("/api/results/:regNumber", async (req, res) => {
    try {
      const result = await getStudentResultByReg(req.params.regNumber);
      if (!result) {
        return res.status(404).json({ error: "Student examination record not found" });
      }
      res.json({ result });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to verify result" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
