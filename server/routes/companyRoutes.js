import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a company
router.post('/register', upload.single('image'), registerCompany)

// company Login
router.post('/login', loginCompany)

//Get Company data
router.get('/company', protectCompany, getCompanyData)

//Post a Job
router.post('/post-job', protectCompany, postJob)

// Get Applicant data of Company
router.get('/applicants', protectCompany,  getCompanyJobApplicants)


// Get compant Job List
router.get('/list-jobs', protectCompany,  getCompanyPostedJobs)

// Change Applicants status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

//Change Applicants Visibility
router.post('/change-visiblity', protectCompany, changeVisibility)

export default router