interface InputProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

interface IButtonProps {
    label: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const InputBox = ({ label, type, name, value, onChange, placeholder }: InputProps) => {
    return (
        <div className="flex flex-col mb-4">
            <label>{label}</label>
            <input
                autoComplete="off"
                type={type ? type : "text"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded p-2"
            />
        </div>
    )
}

export const Button = ({ label, disabled, onClick }: IButtonProps) => {
    return (
        <button
            disabled={disabled || false}
            className={`w-full bg-black font-semibold rounded-full text-white ${label === "Post" && !disabled ? "px-5 py-4" : "px-5 py-2.5"} transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}