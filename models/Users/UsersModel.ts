import { Schema, model, SchemaTypes} from 'mongoose'
import User from './Users.interface';
import bcrypt from 'bcrypt'

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: [true, "First name required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name required"]
  },
  address: {
    type: String,
    required: [true, "Address required"]
  },
  birthday: {
    type: Date,
    required: [true, "Birthday required"]
  },
  email: {
    type: String,
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  role: {
    type: String,
    required: [true, "Role required"]
  },
  profilePicture: {
    type: String,
    required: [true, "Profile picture required"]
  },
  tasks: [{
    type: SchemaTypes.ObjectId,
    default: [],
    ref: "Task"
  }]

})

UserSchema.pre("save", { document: true }, async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    return next();
  } catch (error: any) {
    return next(error)
  }
});

const UserModel = model<User>("User", UserSchema)

export default UserModel