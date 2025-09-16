// components/ArraySection.jsx
'use client';
import { Plus, Icon, Trash2 } from 'lucide-react';
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

export default function ArraySection({ name, label, template, renderItem, minItems = 0, icon: Icon }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const safeAppend = () => append(typeof template === 'function' ? template() : template);

    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                    <h3 className="text-lg font-semibold text-white">{label}</h3>
                </div>
                <button
                    type="button"
                    onClick={safeAppend}
                    className="cursor-pointer flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add {label.slice(0, -1)}</span>
                </button>
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <Icon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No {label.toLowerCase()} added yet.</p>
                    <p className="text-sm mt-1">Click "Add {label.slice(0, -1)}" to get started.</p>
                </div>
            )}

            <div className="space-y-4">
                {fields.map((field, idx) => (
                    <div key={field.id} className="bg-black border border-gray-700 rounded-md p-4">
                        <div className="space-y-4">
                            {renderItem({ index: idx, fieldName: `${name}.${idx}` })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
                            <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="cursor-pointer flex items-center space-x-1 text-red-400 hover:text-red-300 text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}