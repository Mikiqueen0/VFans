import { FaSpinner } from "react-icons/fa";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-background">
            <FaSpinner className="animate-spin text-4xl text-emerald-green" />
        </div>
    )
}
