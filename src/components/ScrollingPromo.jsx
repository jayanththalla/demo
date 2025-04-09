import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllPromos, addPromo, updatePromo, deletePromo } from '../services/promoService';

const ScrollingPromo = ({ isAdmin = false, onActivePromosChange }) => {
    const [promos, setPromos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ id: '', text: '', isActive: true, isUrgent: false });
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    // Color scheme
    const colors = {
        primary: '#9f1d21',
        secondary: '#f7cf00', // yellow
        gray: '#f0f0f0',
        darkGray: '#505050',
        lightGray: '#e2e2e2'
    };

    // Fetch promos
    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const activePromos = await getAllPromos();
                setPromos(activePromos);
                setError(null);
                // Notify parent about active promos
                if (onActivePromosChange) {
                    onActivePromosChange(activePromos.filter(p => p.isActive));
                }
            } catch (err) {
                console.error('Error fetching promos:', err);
                setError('Failed to load promotions');
                setPromos([]);
            }
        };
        fetchPromos();
    }, [onActivePromosChange])

    const handleEdit = (promo) => {
        setEditData(promo);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updatePromo(editData.id, editData);
            } else {
                await addPromo(editData);
            }
            const updatedPromos = await getAllPromos();
            setPromos(updatedPromos);
            setShowForm(false);
            setEditData({ id: '', text: '', isActive: true, isUrgent: false });
            setIsEditing(false);
            setError(null);
        } catch (err) {
            console.error('Error submitting promo:', err);
            setError('Failed to submit promotion');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePromo(id);
            const updatedPromos = await getAllPromos();
            setPromos(updatedPromos);
            setError(null);
        } catch (err) {
            console.error('Error deleting promo:', err);
            setError('Failed to delete promotion');
        }
    };

    if (error) return (
        <div style={{ backgroundColor: colors.lightGray, borderLeft: `4px solid ${colors.primary}` }} className="text-red-700 p-3 rounded shadow-md mb-4 animate-pulse">
            <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
            </div>
        </div>
    );

    if (promos.length === 0 && !isAdmin) return null;

    const activePromos = promos.filter(p => p.isActive);

    return (
        <div className="relative w-full overflow-hidden"> {/* Removed border styles */}
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(!showForm)}
                        style={{ background: `linear-gradient(to right, ${colors.primary}, #c7282c)` }}
                        className="text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                    >
                        {showForm ? (
                            <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Hide Form
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Promo
                            </>
                        )}
                    </motion.button>
                </div>
            )}

            {/* Promo Form */}
            <AnimatePresence>
                {isAdmin && showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 mb-2 rounded-lg shadow-lg mx-4 mt-4 overflow-hidden"
                        style={{ backgroundColor: 'white', border: `1px solid ${colors.lightGray}` }}
                    >
                        <h3 className="font-bold mb-3" style={{ color: colors.primary }}>{isEditing ? 'Edit Promotion' : 'Add New Promotion'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1" style={{ color: colors.darkGray }}>Message</label>
                                <input
                                    type="text"
                                    value={editData.text}
                                    onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                                    className="w-full p-2 rounded-md focus:ring-2 transition-all duration-200"
                                    style={{
                                        border: `1px solid ${colors.lightGray}`,
                                        focusRing: colors.primary,
                                        focusBorder: colors.primary
                                    }}
                                    placeholder="Enter promotional text..."
                                    required
                                />
                            </div>
                            <div className="flex items-center mb-3 space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={editData.isActive}
                                        onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                                        className="h-4 w-4 rounded focus:ring-2"
                                        style={{
                                            color: colors.primary,
                                            borderColor: colors.lightGray,
                                            focusRing: colors.primary
                                        }}
                                    />
                                    <label htmlFor="isActive" className="ml-2 text-sm" style={{ color: colors.darkGray }}>Active</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isUrgent"
                                        checked={editData.isUrgent}
                                        onChange={(e) => setEditData({ ...editData, isUrgent: e.target.checked })}
                                        className="h-4 w-4 rounded focus:ring-2"
                                        style={{
                                            color: colors.primary,
                                            borderColor: colors.lightGray,
                                            focusRing: colors.primary
                                        }}
                                    />
                                    <label htmlFor="isUrgent" className="ml-2 text-sm" style={{ color: colors.darkGray }}>Urgent</label>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    style={{ background: `linear-gradient(to right, ${colors.secondary}, #e6c200)` }}
                                    className="text-gray-800 px-4 py-2 rounded-md shadow hover:shadow-lg transition-all duration-300 font-medium"
                                >
                                    {isEditing ? 'Update' : 'Add'}
                                </motion.button>
                                {isEditing && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditData({ id: '', text: '', isActive: true, isUrgent: false });
                                        }}
                                        style={{ backgroundColor: colors.lightGray }}
                                        className="text-gray-700 px-4 py-2 rounded-md shadow hover:shadow-lg transition-all duration-300"
                                    >
                                        Cancel
                                    </motion.button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Promo List for Admin */}
            <AnimatePresence>
                {isAdmin && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 mb-4 rounded-lg shadow-lg mx-4 mt-2"
                        style={{ backgroundColor: 'white', border: `1px solid ${colors.lightGray}` }}
                    >
                        <h3 className="font-bold mb-3 flex items-center" style={{ color: colors.primary }}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Manage Promotions
                        </h3>
                        {promos.length === 0 ? (
                            <p className="italic text-sm" style={{ color: colors.darkGray }}>No promotions available. Add your first one!</p>
                        ) : (
                            <ul className="space-y-2">
                                {promos.map((promo) => (
                                    <motion.li
                                        key={promo.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex justify-between items-center p-3 rounded-lg transition-all duration-300"
                                        style={{
                                            backgroundColor: promo.isActive
                                                ? (promo.isUrgent ? '#fff5f5' : '#f9fafb')
                                                : colors.gray,
                                            border: `1px solid ${promo.isActive
                                                ? (promo.isUrgent ? colors.primary : colors.secondary)
                                                : colors.lightGray}`
                                        }}
                                    >
                                        <span style={{
                                            textDecoration: !promo.isActive ? 'line-through' : 'none',
                                            color: !promo.isActive ? colors.darkGray : promo.isUrgent ? colors.primary : 'inherit',
                                            fontWeight: promo.isUrgent ? '500' : '400'
                                        }}>
                                            {promo.text}
                                        </span>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleEdit(promo)}
                                                style={{ color: colors.secondary }}
                                                className="hover:text-yellow-600 text-sm font-medium flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDelete(promo.id)}
                                                style={{ color: colors.primary }}
                                                className="hover:text-red-800 text-sm font-medium flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </motion.button>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrolling Promos - Reduced Height */}
            <div className="marquee-container" style={{ height: '24px', overflow: 'hidden', background: 'transparent' }}> {/* Reduced height from 32px to 24px */}
                <motion.div
                    className="flex items-center h-full"
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear"
                    }}
                >
                    {activePromos.map((promo, index) => (
                        <span
                            key={`${promo.id}-${index}`}
                            className="inline-flex items-center mx-6"
                            style={{
                                color: promo.isUrgent ? colors.primary : 'inherit',
                                fontWeight: promo.isUrgent ? '600' : '400'
                            }}
                        >
                            {promo.isUrgent && (
                                <motion.span
                                    className="mr-2 inline-block"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                </motion.span>
                            )}
                            {promo.text}
                            {index < activePromos.length - 1 && (
                                <span className="mx-4" style={{ color: colors.secondary }}>•</span>
                            )}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollingPromo;