// "use server";

// import connect from "../db";
// import user from "../models/user";

// export async function registerUser (data) {
//   try {
//     console.log(data);
//     await connect();
//     const { email } = data;
//     // console.log(user);

//     const existing = await user.findOne(email)
//     if (existing) {
//         return {
//             success: false,
//             message: 'Already exiting email try another'
//         }
//     }

//     const newUser = await user.create(data);
//     if (newUser) {
//         console.log(newUser);
//       return {
//         success: true,
//         message: "You are registered",
//         data: JSON.parse(JSON.stringify(newUser))
//       };
//     } else {
//       return {
//         success: false,
//         message: "error",
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: error,
//     };
//   }
// };


// export async function signInUser(data) {
//     try {
//         await connect()
//         const {email,password} = data
//         // console.log(email,password);
//         const validEmail = await user.findOne(email)
//         console.log(validEmail + "Noooo");
//         // if(!validEmail) return {success: false, message:'Email does not exits'}
//         // if(validEmail.password !== password) return {success: false, message:'Password Incorrect'}

//         // if (validEmail) {
//         //     return {
//         //         success: true,
//         //         message: "Successsful",
//         //         data: JSON.parse(JSON.stringify(validEmail))
//         //     }
//         // }
//     } catch (error) {
//         // return {
//         //     success: false,
//         //     message: error
//         // }
//     }
// } 


"use server";

import { cookies } from "next/headers";
import connect from "../db";
import User from "../models/user"; // Renamed to avoid variable shadowing
import jwt from 'jsonwebtoken'

export async function registerUser(data) {
  try {
    console.log(data);
    await connect();
    const { email } = data;
    // console.log(User);

    // Correct findOne method to use an object with the email field
    const existing = await User.findOne({ email: email });
    if (existing) {
      return {
        success: false,
        message: 'Already existing email, try another'
      };
    }

    // Create new user
    const newUser = await User.create(data);
    if (newUser) {
      const userObject = newUser.toObject(); // Convert to plain object
      console.log("New user created:", userObject);
      return {
        success: true,
        message: "You are registered",
        data: JSON.parse(JSON.stringify(userObject)) // Ensure data is serializable
      };
    } else {
      return {
        success: false,
        message: "Error creating user"
      };
    }
  } catch (error) {
    console.error(error); // Log the error
    return {
      success: false,
      message: error.message // Return error message as a string
    };
  }
}

export async function signInUser(data) {
  try {
    await connect();
    const { email, password } = data;

    // Correct findOne method to use an object with the email field
    const validEmail = await User.findOne({ email: email });
    if (!validEmail) return { success: false, message: 'Email does not exist' };
    if (validEmail.password !== password) return { success: false, message: 'Password incorrect' };

    const userObject = validEmail.toObject(); // Convert to plain object
    console.log("Valid user found:", userObject);

    const userToken = {
        id: validEmail._id,
        email: validEmail.email
    }

    const token = jwt.sign(userToken,"kEy",{expiresIn: "1d"})

    const getCookies = cookies()
    getCookies.set('token', token)

    return {
      success: true,
      message: "Successful",
      data: JSON.parse(JSON.stringify(userObject)) // Ensure data is serializable
    };
  } catch (error) {
    console.error(error); // Log the error
    return {
      success: false,
      message: error.message // Return error message as a string
    };
  }
}

export async function getUser(){
    try {
        const getCookie = cookies()
        const val = getCookie.get('token') || " "
        console.log(val);
        if(val === " ") return {success:false,message:"No user"}

        const decoded =  jwt.verify(val.value,'kEy')
        console.log(decoded);
        const info = await User.findOne({_id: decoded.id})

       if (info) {
        const n = info.toObject()
        return {
            success: true,
            data: JSON.parse(JSON.stringify(n))
        }
       } else {
        return {
            success: false,
            message: 'nahiiiiiii'
        }
       }
    } catch (error) {
        
    }
}

export async function logOutAction(){
  const getCookies = cookies()
  getCookies.set('token',"")
}
