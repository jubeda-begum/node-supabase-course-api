const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const validateEnrollment = require("../middleware/validateEnrollment");


// GET all courses
router.get("/courses", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST enroll student
router.post("/enroll", validateEnrollment, async (req, res) => {
  try {
    const { student_name, course_id } = req.body;

    const { data, error } = await supabase
      .from("enrollments")
      .insert([{ student_name, course_id }]);

    if (error) throw error;

    res.json({
      message: "Enrollment successful",
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET enrollments for a course
router.get("/courses/:id/enrollments", async (req, res) => {
  try {
    const courseId = req.params.id;

    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("course_id", courseId);

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;