const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();

const Razorpay = require("razorpay");

// var razorpayInstance = new Razorpay({
//   key_id: "rzp_live_6ooiZ2ylvMAB1f",
//   key_secret: "90UmKBYwonhPWasWQ6fnNikE",
//   headers: { "Content-Type": "application/json" },
// });

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
  let razorpayInstance1 = new Razorpay({
    key_id: "rzp_live_6ooiZ2ylvMAB1f",
    key_secret: "90UmKBYwonhPWasWQ6fnNikE",
    headers: { "Content-Type": "application/json" },
  });
  const result = await razorpayInstance1.paymentLink.all();

  res.json({ result });
});

app.post("/createLink", async function (req, res) {
  const { amount, amountInINR, email } = req.body;
  let razorpayInstance2 = new Razorpay({
    key_id: "rzp_live_6ooiZ2ylvMAB1f",
    key_secret: "90UmKBYwonhPWasWQ6fnNikE",
  });
  try {
    const result = await razorpayInstance2.paymentLink.create({
      amount: amountInINR,
      currency: "INR",
      description: "For Hedonova",
      customer: {
        email: email,
      },
      notes: {
        amount: amount,
        email: email,
      },
    });
    res.json({ result: result });
  } catch (error) {
    res.json({ error: error });
  }
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
