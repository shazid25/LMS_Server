// import { Webhook } from "svix";
// import User from "../models/User.js";

// //API controller function to manage clerk user with database
// export const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         });

//         const { type, data } = req.body;

//         switch (type) {
//             case "user.created": {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     imageUrl: data.profile_image_url
//                 }
//                 await User.create(userData);
//                 res.json({})
//                 break;
//             }

//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     imageUrl: data.profile_image_url
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }

//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id);
//                 res.json({})
//                 break;
//             }

//             default:
//                 break;
//         }

//     } catch (error) {
//         console.error("Webhook error:", error.message);
//         res.status(400).json({ message: false, error: error.message });
//     }
// }









export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString();

    const evt = whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = evt;

    if (type === "user.created") {
      await User.create({
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.profile_image_url,
      });
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.profile_image_url,
      });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Webhook error:", err);
    res.status(400).json({ error: err.message });
  }
};
