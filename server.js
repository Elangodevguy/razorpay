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

app.get("/", async function (req, res) {
  let razorpayInstance1 = new Razorpay({
    key_id: "rzp_live_6ooiZ2ylvMAB1f",
    key_secret: "90UmKBYwonhPWasWQ6fnNikE",
    headers: { "Content-Type": "application/json" },
  });
  const result = await razorpayInstance1.paymentLink.all();

  res.json({ result });
});

app.get("/createLink", async function (req, res) {
  let razorpayInstance2 = new Razorpay({
    key_id: "rzp_live_6ooiZ2ylvMAB1f",
    key_secret: "90UmKBYwonhPWasWQ6fnNikE",
  });
  try {
    const result = await razorpayInstance2.paymentLink.create({
      amount: 100000,
      currency: "INR",
      description: "For Hedonova",
      customer: {
        name: "Elango Test",
        email: "3elango@gmail.com",
      },
      notes: {
        amount: "130.85",
        email: "3elango@gmail.com",
      },
    });
    res.json({ result: result });
  } catch (error) {
    res.json({ error: error });
  }
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
