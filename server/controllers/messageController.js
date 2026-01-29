const Message = require('../models/Message');
const { encrypt, decrypt } = require('../utils/encryption');

exports.sendMessage = async (req, res) => {
    const { consultationId, content } = req.body;

    try {
        const encryptedContent = encrypt(content);

        const message = await Message.create({
            consultationId,
            senderId: req.user._id,
            content: encryptedContent
        });

        res.status(201).json({
            ...message._doc,
            content: content // Return decrypted for sender immediately
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ consultationId: req.params.consultationId })
            .populate('senderId', 'name role')
            .sort({ timestamp: 1 });

        const decryptedMessages = messages.map(msg => {
            return {
                ...msg._doc,
                content: decrypt(msg.content)
            };
        });

        res.json(decryptedMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
