const mongoose=require("mongoose");

const userSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
   date: {
      type: Date,
      default: Date.now, 
    },
    priority: {
      type: String,
      required: true,
    },
    completed: {
      type: String,
      default: "No",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const user = mongoose.model("user", userSchema);

module.exports=user