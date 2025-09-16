import { Icon } from 'lucide-react';

export default function FormInput({ label, icon: Icon, error, children, ...props }) {
    return (
        <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-white">
                {Icon && <Icon className="w-4 h-4" />}
                <span>{label}</span>
            </label>
            {children}
            {error && <p className="text-red-400 text-sm flex items-center space-x-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                <span>{error}</span>
            </p>}
        </div>
    );
}