import { Inngest } from 'inngest';
import connectDB from './db.config.js';
import { User } from '../models/user.model.js';


// Create a client to sens and recive an events .
export const inngest = new Inngest({ id: "connecta-production" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    
    const newUser = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url
    }
    await User.create(newUser);

    //  TODO : MORE THINGS HERE
    }
);

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
        await deleteStreamUser(id); // delete user from stream

        //  TODO : MORE THINGS HERE
    }
);

//  Create a Empty array where we will store all the functions
export const functions = [syncUser, deleteUserFromDB];