import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [price, setPrice] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    type: "",
    masked: false,
  });

  // ✅ Logos
  const cardLogos = {
    Visa: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    MasterCard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    Amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg",
    RuPay: "https://upload.wikimedia.org/wikipedia/commons/f/fd/RuPay_logo.svg",
  };

  // ✅ Bank URLs for redirection
  const bankUrls = {
    HDFC: "https://netbanking.hdfcbank.com",
    ICICI: "https://infinity.icicibank.com",
    SBI: "https://retail.onlinesbi.sbi",
    AXIS: "https://www.axisbank.com",
  };

  // ✅ Fetch dynamic price
  useEffect(() => {
    if (course?.id) {
      fetch(`https://your-backend.com/api/courses/${course.id}`)
        .then((res) => res.json())
        .then((data) => setPrice(data.price))
        .catch(() => setPrice(4999));
    } else {
      setPrice(4999);
    }
  }, [course]);

  // ✅ Name
  const handleNameChange = (e) => {
    let value = e.target.value
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setCardDetails({ ...cardDetails, name: value });
  };

  // ✅ Card Number + Type
  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = value.replace(/(.{4})/g, "$1 ").trim();

    let type = "";
    if (/^4/.test(value)) type = "Visa";
    else if (/^5/.test(value)) type = "MasterCard";
    else if (/^3/.test(value)) type = "Amex";
    else if (/^6/.test(value)) type = "RuPay";

    setCardDetails({ ...cardDetails, number: formatted, type, masked: false });
  };

  // ✅ Mask card
  const handleNumberBlur = () => {
    if (cardDetails.number.replace(/\s/g, "").length >= 12) {
      const clean = cardDetails.number.replace(/\s/g, "");
      const masked = "**** **** **** " + clean.slice(-4);
      setCardDetails({ ...cardDetails, number: masked, masked: true });
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardDetails({ ...cardDetails, expiry: value });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardDetails({ ...cardDetails, cvv: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Payment successful for ${course.title}`);
    navigate("/");
  };

  // ✅ Netbanking
  const handleNetbankingPay = () => {
    if (selectedBank && bankUrls[selectedBank]) {
      window.location.href = bankUrls[selectedBank];
    } else {
      alert("⚠️ Please select a bank.");
    }
  };

  // ✅ If no course selected
  if (!course) {
    return (
      <div className="p-6 text-center dark:bg-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
          ⚠️ Please select a course before proceeding to payment.
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center transition-colors duration-300">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 dark:text-gray-100 shadow-2xl rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ✅ Course Details */}
        <div className="space-y-4 text-center lg:text-left">
          <img
            src={course.image}
            alt={course.title}
            className="rounded-xl shadow-lg mx-auto lg:mx-0 w-96 h-64 object-cover"
          />
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
          <p className="text-lg font-semibold">
            Price: {price ? `₹${price}` : "Loading..."}
          </p>
        </div>

        {/* ✅ Payment Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
          <Tab.Group>
            <Tab.List className="flex space-x-2 rounded-xl bg-gray-200 dark:bg-gray-700 p-1">
              {[
                { name: "Card", icon: <CreditCard size={18} /> },
                { name: "NetBanking", icon: <Landmark size={18} /> },
                { name: "UPI", icon: <Smartphone size={18} /> },
              ].map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2",
                      selected
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:shadow"
                    )
                  }
                >
                  {tab.icon}
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-4">
              {/* ✅ Card Payment */}
              <Tab.Panel>
                <div className="space-y-6">
                  {/* Card Preview */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold">MyBank</span>
                      {cardDetails.type && (
                        <img
                          src={cardLogos[cardDetails.type]}
                          alt={cardDetails.type}
                          className="h-6"
                        />
                      )}
                    </div>
                    <p className="text-xl tracking-widest mb-6">
                      {cardDetails.number || "#### #### #### ####"}
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs">Card Holder</p>
                        <p>{cardDetails.name || "Your Name"}</p>
                      </div>
                      <div>
                        <p className="text-xs">Expiry</p>
                        <p>{cardDetails.expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={handleNameChange}
                        className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium flex justify-between">
                        <span>Card Number</span>
                        {cardDetails.type && (
                          <img
                            src={cardLogos[cardDetails.type]}
                            alt={cardDetails.type}
                            className="h-5"
                          />
                        )}
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={handleNumberChange}
                        onBlur={handleNumberBlur}
                        placeholder="#### #### #### ####"
                        className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium">CVV</label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={handleCvvChange}
                          placeholder="***"
                          className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Pay {price ? `₹${price}` : ""}
                    </button>
                  </form>
                </div>
              </Tab.Panel>

              {/* ✅ Netbanking */}
              <Tab.Panel>
                <div className="space-y-4">
                  <label className="block">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">-- Choose Bank --</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="AXIS">Axis Bank</option>
                  </select>
                  <button
                    onClick={handleNetbankingPay}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </Tab.Panel>

              {/* ✅ UPI */}
              <Tab.Panel>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <div className="flex gap-4">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg">
                      Google Pay
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">
                      PhonePe
                    </button>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
