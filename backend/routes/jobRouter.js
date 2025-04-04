import express from 'express';
import { deleteJob, getAllJobs, getmyJobs, postJob, updateJob } from "../controllers/jobController.js"; // Ensure postJob is imported
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/updateJob/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);

export default router;
