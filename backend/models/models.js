import mongoose from 'mongoose';

const dataManagementSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userDescription: {
        type: String,
        required: true
    },
    userProfileImage: {
        type: String,
        required: false
    }
}, { timestamps: true });

const dataManagement = mongoose.model('dataManagement', dataManagementSchema);

export { dataManagement };
