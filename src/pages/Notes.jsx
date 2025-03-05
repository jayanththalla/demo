import { AlertCircle } from 'lucide-react';

const NotesSection = ({ notes }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="mr-2 text-yellow-400" size={24} />
                THINGS TO NOTE:
            </h3>
            <div className="bg-gray-900 border border-yellow-400 p-6 rounded-lg shadow-lg">
                <ol className="list-decimal pl-5 space-y-3">
                    {notes.map((note, index) => (
                        <li key={index} className="text-gray-300">
                            {note}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default NotesSection;