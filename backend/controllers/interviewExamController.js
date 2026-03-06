import InterviewExam from '../models/InterviewExam.js';
import Student from '../models/Student.js';
import User from '../models/User.js';

// Create Interview Exam
export const createExam = async (req, res) => {
  try {
    const { title, description, durationMinutes, questions } = req.body;
    const createdBy = req.user.id;
    const exam = await InterviewExam.create({
      title,
      description,
      durationMinutes,
      questions,
      createdBy
    });
    res.status(201).json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Interview Exams
export const getAllExams = async (req, res) => {
  try {
    const exams = await InterviewExam.find().populate('createdBy', 'name role');
    res.status(200).json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Interview Exam by ID
export const getExamById = async (req, res) => {
  try {
    const exam = await InterviewExam.findById(req.params.id).populate('createdBy', 'name role');
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.status(200).json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Interview Exam
export const updateExam = async (req, res) => {
  try {
    const { title, description, durationMinutes, questions, status } = req.body;
    const exam = await InterviewExam.findByIdAndUpdate(
      req.params.id,
      { title, description, durationMinutes, questions, status },
      { new: true }
    );
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.status(200).json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Interview Exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await InterviewExam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.status(200).json({ success: true, message: 'Exam deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assign Exam to Candidate (Student)
export const assignExamToCandidate = async (req, res) => {
  try {
    // You can implement assignment logic here (e.g., add exam to student profile or create a new collection)
    res.status(200).json({ success: true, message: 'Assignment endpoint placeholder' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student submits Interview Exam
export const submitExam = async (req, res) => {
  try {
    // You can implement submission logic here (e.g., save answers, mark as submitted)
    res.status(200).json({ success: true, message: 'Submission endpoint placeholder' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
