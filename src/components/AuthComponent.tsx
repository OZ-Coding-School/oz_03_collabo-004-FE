import { useNavigate } from "react-router-dom";

const AuthComponent = ({ type }: { type: string }) => {
    const nav = useNavigate();

    const homeHandler = () => {
        nav("/");
    };

    const loginHandler = () => {
        console.log("login");
    };
    const registerHandler = () => {
        console.log("register");
    };

    return (
        <>
            <h1 className="text-3xl text-center font-bold">TEST PAGE</h1>
            <div className="flex flex-col gap-2 w-[300px] m-auto mt-10">
                <input className="p-2 rounded-md bg-slate-100" placeholder="ID"></input>
                <input className="p-2 rounded-md bg-slate-100" placeholder="PW"></input>
                <button
                    onClick={type === "LOGIN" ? loginHandler : registerHandler}
                    className="bg-slate-400 hover:bg-slate-600 text-white rounded-full"
                >
                    {type === "LOGIN" ? "login" : "register"}
                </button>
                <button onClick={homeHandler} className="bg-slate-600 hover:bg-slate-800 text-white rounded-full">
                    Home
                </button>
            </div>
        </>
    );
};

export default AuthComponent;
