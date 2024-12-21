const express = require('express');
const router = express.Router();
const Skills = require('..//models/Skills');
const User = require('..//models/User');
const Transactions = require('..//models/Transactions');
const sequelize = require('../config/database'); // Path to your Sequelize instance


router.post('/', async (req, res) => {
    const { buyerId, skillId, duration } = req.body;
    //const { skillId, duration } = req.body;
    console.log(`BuyerID: ${buyerId}`)
    console.log(`SkillID: ${skillId}`);
    console.log(`Durotation: ${duration}`);

    try {
        // BUYER
        const buyer = await User.findByPk(buyerId);
        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }

        // SKILL BEING BOUGHT
        const skill = await Skills.findByPk(skillId);
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        
        // SELLER
        const sellerId = skill.user_id;
        const seller = await User.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found'});
        }


        // Prevent buyer from purchasing their own skill
        if (buyerId === sellerId) {
            return res.status(400).json({ error: 'You cannot purchase your own skill.' });
        }

        const totalCost = skill.hourly_rate * duration

        // Check if buyer has enough credits
        if (buyer.credits < totalCost) {
            return res.status(400).json({ error: 'Insufficient credits to purchase this skill.' });
        }

        const transaction = await sequelize.transaction(async (t) => {
            // Deduct credits from buyer
            await buyer.update(
                { credits: Math.round(Number(buyer.credits) - Number(totalCost)) }, // Force conversion to number
                { transaction: t }
            );
        
            // Add credits to seller
            await seller.update(
                { credits: Math.round(Number(seller.credits) + Number(totalCost)) }, // Force conversion to number
                { transaction: t }
            );
            
            // Record the transaction
            const newTransaction = await Transactions.create(
                {
                    buyer_id: buyerId,
                    seller_id: sellerId,
                    skill_id: skillId,
                    amount: Math.round(totalCost),
                },
                { transaction: t }
            );
        
            return newTransaction;
        });
        return res.status(201).json({ message: 'Transaction completed successfully!', transaction });
    }
     catch (error) {
        console.error('Error processing transaction:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

/*
router.post('/', async (req, res) => {
    const { skillId, duration } = req.body;
    const { userId } = req.user; // Extract from token
    try {
        const skill = await Skills.findByPk(skillId);
        if (!skill) return res.status(404).send({ error: 'Skill not found' });

        const totalCost = skill.hourly_rate * duration;

        // Logic to handle credits and booking records
        // e.g., deduct credits from the buyer and create a booking record

        return res.status(201).send({ message: 'Booking successful!' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
});
*/


module.exports = router;
