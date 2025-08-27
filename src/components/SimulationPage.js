import { useState } from "react";
import PageContainer from "./PageContainer";
import Particles from "./Particle";

const SimulationPage = () => {
  const [advertisers, setAdvertisers] = useState([
    {
      name: "Oil Company",
      baseBid: 0.1,
      logo: "/ads/oilCompany.png",
      finalBid: 0,
    },
    {
      name: "Chinese vertical e-commerce",
      baseBid: 0.1,
      logo: "/ads/verticalEcommerce.png",
      finalBid: 0,
    },
    {
      name: "Tire Company",
      baseBid: 0.1,
      logo: "/ads/tireCompany.png",
      finalBid: 0,
    },
  ]);

  const websiteTemplates = [
    { name: "The Guardian", img: "/theGuardian.png", width: 950, height: 100 },
    { name: "Fandom", img: "/Fandom.png", width: 730, height: 90 },
    { name: "The Verge", img: "/theVerge.png", width: 400, height: 600 },
  ];

  const [winner, setWinner] = useState(null);

  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    device_type: "mobile",
    region: "unknown",
    os: "Android",
    interests: ["eduation"],
    ad_width: 950,
    ad_height: 100,
  });

  const selectedWebsite = websiteTemplates.find(
    (site) =>
      site.width === userProfile.ad_width &&
      site.height === userProfile.ad_height
  );
  const steps = [
    { id: 1, title: "User Profile", desc: "Select user characteristics" },
    { id: 2, title: "Website Visit", desc: "Choose website and ad slot" },
    {
      id: 3,
      title: "SSP Request",
      desc: "Send request to Supply-Side Platform",
    },
    { id: 4, title: "DSP Bidding", desc: "Demand-Side Platforms compete" },
    { id: 5, title: "Winner Selection", desc: "Highest bidder wins" },
    { id: 6, title: "Ad Display", desc: "Show personalized ad" },
  ];

  const sendUserProfileForPrediction = async (userProfile) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;

      // Use predictions in your app logic here
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  const getAdStyleForWebsite = (siteName) => {
    switch (siteName) {
      case "Fandom":
        return {
          top: "32px",
          left: "26%",
          width: "52%",
          height: "50px",
        };
      case "The Verge":
        return {
          top: "25%",
          bottom: "20px",
          right: "10%",
          width: "30%",
          height: "50",
        };
      default: // The Guardian or fallback
        return {
          top: "5px",
          left: "0",
          right: "0",
          height: "130px",
        };
    }
  };

  const calculateBids = async () => {
    const result = await sendUserProfileForPrediction(userProfile);
    console.log(result);

    const baseBid = 0.1;

    // Average CTRs for each advertiser
    const avgCtrs = {
      "Chinese vertical e-commerce": 0.000806105145865561,
      "Oil Company": 0.0007462791711301766,
      "Tire Company": 0.0005247648150142145,
    };

    const updated = advertisers.map((adv) => {
      // Get calibrated probability from backend response
      let calibratedProb = 0;
      if (adv.name === "Chinese vertical e-commerce") {
        calibratedProb = result.verticalEcommerceModelPredictionCalibrated;
      } else if (adv.name === "Oil Company") {
        calibratedProb = result.oilModelPredictionCalibrated;
      } else if (adv.name === "Tire Company") {
        calibratedProb = result.tireModelPredictionCalibrated;
      }

      const avgCtr = avgCtrs[adv.name];
      const bid = baseBid * (1 + Math.log1p(calibratedProb / avgCtr));
      const finalBid = parseFloat(bid.toFixed(2));

      return { ...adv, finalBid };
    });

    setAdvertisers(updated);

    const winningAd = updated.reduce(
      (max, ad) => (ad.finalBid > max.finalBid ? ad : max),
      updated[0]
    );
    setWinner(winningAd);
  };

  return (
    <PageContainer className="px-8">
      <Particles />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          RTB Simulation
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                  step === s.id
                    ? "bg-cyan-400/20 border-2 border-cyan-400"
                    : step > s.id
                    ? "bg-green-400/20 border-2 border-green-400"
                    : "bg-white/5 border-2 border-white/20"
                }`}
                onClick={() => setStep(s.id)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === s.id
                      ? "bg-cyan-400 text-black"
                      : step > s.id
                      ? "bg-green-400 text-black"
                      : "bg-white/20"
                  }`}
                >
                  {s.id}
                </div>
                <h3 className="text-sm font-semibold mt-2">{s.title}</h3>
                <p className="text-xs text-white/60 text-center">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Configure User Profile
              </h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Region</h3>
                  <div className="space-y-2">
                    {["unknown", "beijing", "tianjin", "hebei", "shanxi"].map(
                      (region) => (
                        <button
                          key={region}
                          onClick={() =>
                            setUserProfile({ ...userProfile, region })
                          }
                          className={`w-full p-3 rounded capitalize transition-all ${
                            userProfile.region === region
                              ? "bg-cyan-400 text-black"
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {region}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Device Type</h3>
                  <div className="space-y-2">
                    {["mobile", "desktop", "other"].map((device_type) => (
                      <button
                        key={device_type}
                        onClick={() =>
                          setUserProfile({ ...userProfile, device_type })
                        }
                        className={`w-full p-3 rounded capitalize transition-all ${
                          userProfile.device_type === device_type
                            ? "bg-cyan-400 text-black"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {device_type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    Operating System
                  </h3>
                  <div className="space-y-2">
                    {["Android", "Mac", "Windows"].map((os) => (
                      <button
                        key={os}
                        onClick={() => setUserProfile({ ...userProfile, os })}
                        className={`w-full p-3 rounded capitalize transition-all ${
                          userProfile.os === os
                            ? "bg-cyan-400 text-black"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {os}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Interests</h3>
                  <div className="space-y-2">
                    {[
                      "entertainment",
                      "eduation",
                      "automobile",
                      "clothing shoes, bags",
                      "IT",
                      "beauty and personal care"
                    ].map((interest) => (
                      <button
                        key={interest}
                        onClick={() => {
                          const interests = userProfile.interests.includes(
                            interest
                          )
                            ? userProfile.interests.filter(
                                (i) => i !== interest
                              )
                            : [...userProfile.interests, interest];
                          setUserProfile({ ...userProfile, interests });
                        }}
                        className={`w-full p-3 rounded capitalize transition-all ${
                          userProfile.interests.includes(interest)
                            ? "bg-purple-500 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Step {step}: {steps[step - 1].title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Choose a website and ad slot size
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    id: 1,
                    name: "The Guardian",
                    img: "/theGuardian.png",
                    width: 950,
                    height: 100,
                  },
                  {
                    id: 2,
                    name: "Fandom",
                    img: "/Fandom.png",
                    width: 730,
                    height: 90,
                  },
                  {
                    id: 3,
                    name: "The Verge",
                    img: "/theVerge.png",
                    width: 400,
                    height: 600,
                  },
                ].map(({ id, name, img, width, height }) => {
                  const isSelected =
                    userProfile.ad_width === width &&
                    userProfile.ad_height === height;
                  return (
                    <div
                      key={id}
                      onClick={() =>
                        setUserProfile({
                          ...userProfile,
                          ad_width: width,
                          ad_height: height,
                        })
                      }
                      className={`cursor-pointer bg-white/5 rounded-lg border-2 p-4 transition-all hover:scale-105 ${
                        isSelected
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Website ${name}`}
                        className="rounded mb-4 w-full h-48 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-cyan-300 mb-1">
                        {name}
                      </h3>
                      <p className="text-white text-sm">
                        Ad Size:{" "}
                        <strong>
                          {width}x{height}
                        </strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Step {step}: {steps[step - 1].title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Select a Supply-Side Platform (SSP)
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {["Google SSP", "OpenX", "Magnite"].map((ssp) => (
                  <button
                    key={ssp}
                    onClick={() => setUserProfile({ ...userProfile, ssp })}
                    className={`w-full p-6 rounded-lg text-lg font-semibold transition-all ${
                      userProfile.ssp === ssp
                        ? "bg-cyan-400 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {ssp}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Step {step}: {steps[step - 1].title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                These advertisers are bidding for your ad slot
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
                {advertisers.map(({ name, logo, finalBid }) => (
                  <div
                    key={name}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 transition-all hover:scale-105"
                  >
                    <img
                      src={logo}
                      alt={name}
                      className="w-20 h-20 object-contain mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <p className="text-cyan-300 text-sm mt-2">
                      {finalBid
                        ? `Bid: $${finalBid} CPM`
                        : "Waiting for bid..."}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={calculateBids}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg hover:scale-105 transition-all text-black font-semibold"
              >
                Calculate Bids
              </button>
            </div>
          )}
          {step === 5 && winner && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Step {step}: {steps[step - 1].title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Winning Advertiser Selected
              </p>
              <div className="max-w-md mx-auto bg-white/5 p-6 rounded-xl border border-green-400/40 shadow-lg transition-all">
                <img
                  src={winner.logo}
                  alt={winner.name}
                  className="w-24 h-24 object-contain mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-green-300 mb-2">
                  {winner.name}
                </h3>
                <p className="text-lg text-white">
                  Winning Bid:{" "}
                  <span className="text-cyan-400 font-semibold">
                    ${winner.finalBid} CPM
                  </span>
                </p>
              </div>
            </div>
          )}
          {step === 6 && winner && selectedWebsite && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Step {step}: {steps[step - 1].title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Displaying the ad on selected website
              </p>
              <div className="relative mx-auto rounded-lg overflow-hidden max-w-3xl border border-white/20 shadow-lg">
                {/* Website background */}
                <img
                  src={selectedWebsite.img}
                  alt={selectedWebsite.name}
                  className="w-full h-auto"
                />

                {/* Ad overlay */}
                <div
                  className="absolute bg-white rounded shadow-lg flex items-center justify-center"
                  style={getAdStyleForWebsite(selectedWebsite.name)}
                >
                  <img
                    src={winner.logo}
                    alt={`${winner.name} Ad`}
                    className="h-full w-full object-cover p-2"
                  />
                </div>
              </div>

              <p className="mt-6 text-white text-sm">
                Ad from{" "}
                <strong className="text-green-300">{winner.name}</strong> shown
                on{" "}
                <strong className="text-cyan-300">
                  {selectedWebsite.name}
                </strong>
              </p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(Math.min(6, step + 1))}
              disabled={step === 6}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SimulationPage;
