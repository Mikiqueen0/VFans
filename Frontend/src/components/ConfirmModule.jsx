
export default function ConfirmModule({ setConfirm, name }) {
    return (
        <div className="fixed w-[16rem] h-[10rem] bg-gray-400 rounded-[10px] z-[9999]">
            <p>Do you want to delete {name}?</p>
            <button onClick={() => setConfirm(false)}>Cancel</button>
            <button onClick={() => setConfirm(true)}>Yes</button>
        </div>
    )
}
