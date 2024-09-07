import { motion } from "framer-motion";

const AdminLoading = () => {
    return (
        <div className="overflow-y-hidden w-full flex items-center justify-center h-screen bg-indigo-900">
            <div className="w-full space-y-8 flex flex-col justify-center items-center">
                <img className="w-[200px] h-[100px] mb-10" src="/img/header_logo.png"></img>
                <motion.div
                    className="text-4xl w-full font-bold text-white text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Loading To AdminPage...
                </motion.div>

                <div className="w-[300px] h-2 bg-indigo-300 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full w-1/3 bg-white"
                        animate={{
                            x: ["0%", "200%", "0%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminLoading;
