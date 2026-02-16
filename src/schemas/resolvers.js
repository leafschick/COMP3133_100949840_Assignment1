const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Employee = require("../models/Employee");
const { getAllEmployees } = require("../controllers/user.controller");

const resolvers = {
  Query: {
    // LOGIN
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: "Sorry we cannot find the user with that email",
            user: null,
          };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return {
            success: false,
            message: "This is an invalid password, please try again",
            user: null,
          };
        }

        return {
          success: true,
          message: "Congratulations! Login has been successful",
          user,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          user: null,
        };
      }
    },

    // GET ALL EMPLOYEES
    employees: async () => {
      return await getAllEmployees();
    },

    //  SEARCH EMPLOYEE BY EID
    employee: async (_, { eid }) => {
      const emp = await Employee.findById(eid);

      if (!emp) {
        throw new Error("Sorry at this time employee cannot be found");
      }

      return emp;
    },

    // SEARCH EMPLOYEE BY DESIGNATION OR DEPARTMENT
    searchEmployee: async (_, { designation, department }) => {
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;

      return await Employee.find(filter);
    },
  },

  Mutation: {
    // SIGNUP

    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });

        if (existingUser) {
          return {
            success: false,
            message: "Username or email already exists",
            user: null,
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        return {
          success: true,
          message: "User has been created successfully",
          user: newUser,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          user: null,
        };
      }
    },

    // ADD NEW EMPLOYEE
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },

    // UPDATE EMPLOYEE BY EID
    updateEmployee: async (
      _,
      {
        eid,
        first_name,
        last_name,
        email,
        gender,
        salary,
        designation,
        department,
      },
    ) => {
      const updates = {};

      if (first_name !== undefined) updates.first_name = first_name;
      if (last_name !== undefined) updates.last_name = last_name;
      if (email !== undefined) updates.email = email;
      if (gender !== undefined) updates.gender = gender;
      if (salary !== undefined) updates.salary = salary;
      if (designation !== undefined) updates.designation = designation;
      if (department !== undefined) updates.department = department;

      const updatedEmployee = await Employee.findByIdAndUpdate(eid, updates, {
        new: true,
      });

      if (!updatedEmployee) {
        throw new Error("We cannot find the employee to update");
      }

      return updatedEmployee;
    },

    // DELETE EMPLOYEE BY EID
    deleteEmployee: async (_, { eid }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(eid);

      if (!deletedEmployee) {
        throw new Error("We cannot find the employee to delete");
      }

      return deletedEmployee;
    },
  },
};

module.exports = resolvers;
