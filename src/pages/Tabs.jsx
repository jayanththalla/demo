import { motion } from 'framer-motion';
import { Film, Music } from 'lucide-react';
import PropTypes from 'prop-types';

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <motion.div
            className="flex mb-8 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('theaters')}
                className={`py-3 px-8 mr-4 rounded-lg font-bold transition-all duration-300 flex items-center ${activeTab === 'theaters'
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                        : 'bg-white border border-gray-300 text-black hover:bg-gray-100'
                    }`}
            >
                <Film className={`mr-2 ${activeTab === 'theaters' ? 'text-black' : 'text-gray-700'}`} size={20} />
                Private Theaters
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('party')}
                className={`py-3 px-8 rounded-lg font-bold transition-all duration-300 flex items-center ${activeTab === 'party'
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                        : 'bg-white border border-gray-300 text-black hover:bg-gray-100'
                    }`}
            >
                <Music className={`mr-2 ${activeTab === 'party' ? 'text-black' : 'text-gray-700'}`} size={20} />
                Party Hall
            </motion.button>
        </motion.div>
    );
};

Tabs.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired
};

export default Tabs;