// OrderDetailsModal.tsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Order = {
    id: number;
    productName: string;
    price: number;
    purchaseDate: string;
    status: string;
    details: string;
    quantity: number;
    shippingAddress: string;
    estimatedDelivery: string;
    paymentMethod: string;
};

type OrderDetailsModalProps = {
    open: boolean;
    onClose: () => void;
    order: Order | null;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, onClose, order }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="order-details-title"
            aria-describedby="order-details-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="order-details-title" variant="h6" component="h2">
                    Sifariş Detayları
                </Typography>
                {order && (
                    <>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Məhsul Adı:</strong> {order.productName}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Qiymət:</strong> {order.price} ₼
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Say:</strong> {order.quantity}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Alinma tarixi:</strong> {new Date(order.purchaseDate).toLocaleDateString()}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Status:</strong> {order.status}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Göndərilmə Ünvani:</strong> {order.shippingAddress}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Təxmini Çatdırılma Tarixi:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Ödəniş Metodu:</strong> {order.paymentMethod}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Detaylar:</strong> {order.details}
                        </Typography>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default OrderDetailsModal;
