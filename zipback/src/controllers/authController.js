import { User } from '../models/User.js';
import { sendMail } from '../config/mailer.js';

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const code = generateCode();
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
  }
  user.verificationCode = code;
  user.verified = false;
  await user.save();
  await sendMail({
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`
  });
  res.json({ message: 'Verification code sent' });
};

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'Email and code required' });
  const user = await User.findOne({ email });
  if (!user || user.verificationCode !== code) {
    return res.status(400).json({ message: 'Invalid code' });
  }
  user.verified = true;
  user.verificationCode = undefined;
  await user.save();
  res.json({ message: 'Email verified' });
};
