import { FeedbackContext } from "@/context/FeedbackContext";
import axios from "axios";
import { useContext, useState } from "react";

const Contact = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const { createSnackbar } = useContext(FeedbackContext);

    const onSend = () => {
        if(message.trim() === "" || (email.trim() === "" && name.trim() === "")){
            createSnackbar("Please fill the form and then send", { variant: 'error' });
        }else{
            axios.post("/api/contact",{
                "name":name,
                "email":email,
                "message":message
            })
        }   
    }
    return (

        <div className="container py-16 md:py-20" id="contact">
        <h2
            className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
        >
            Here's a contact form
        </h2>
        <h4
            className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
        >
            Have Any Questions?
        </h4>
        <div className="mx-auto w-full pt-10 sm:w-3/4">
            <div className="flex flex-col md:flex-row">
                <input
                    className="mr-3 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    id="name"
                />
                <input
                    className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    id="email"
                />
            </div>
            <textarea
                className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-8"
                placeholder="Message"
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                id="message"
            ></textarea>
            <button
                onClick={onSend}
                className="mt-6 flex w-full items-center justify-center rounded bg-primary px-8 py-3 font-header text-lg font-bold uppercase text-white hover:bg-grey-20"
            >
                Send
                <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
            </button>
        </div>
    </div>
    )
}

export default Contact;