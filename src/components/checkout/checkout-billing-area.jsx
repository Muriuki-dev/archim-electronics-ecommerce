import React from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";

const counties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka Nithi",
  "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
  "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia",
  "Uasin Gishu", "Elgeyo Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
  "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
  "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    // Check if all mandatory fields are filled out
    if (!data.firstName || !data.lastName || !data.county || !data.address || !data.city || !data.contactNo || !data.email) {
      alert("Please fill in all required fields before submitting!");
      return;
    }

    // Save billing data to localStorage
    const billingInfo = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      county: data.county,
      contactNo: data.contactNo,
      note: data.orderNote || "",
    };

    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
  };

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            {/* First Name */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>First Name <span>*</span></label>
                <input
                  {...register("firstName", {
                    required: "First name is required!",
                  })}
                  type="text"
                  placeholder="First Name"
                  defaultValue={user?.firstName || ""}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Last Name <span>*</span></label>
                <input
                  {...register("lastName", {
                    required: "Last name is required!",
                  })}
                  type="text"
                  placeholder="Last Name"
                  defaultValue={user?.lastName || ""}
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>

            {/* County */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>County <span>*</span></label>
                <select
                  {...register("county", {
                    required: "County is required!",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>Select your county</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
                <ErrorMsg msg={errors?.county?.message} />
              </div>
            </div>

            {/* Street Address */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address <span>*</span></label>
                <input
                  {...register("address", {
                    required: "Address is required!",
                  })}
                  type="text"
                  placeholder="House number and street name"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>

            {/* City */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Town / City <span>*</span></label>
                <input
                  {...register("city", {
                    required: "City is required!",
                  })}
                  type="text"
                  placeholder="e.g. Nairobi"
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>

            {/* Postal Code */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postal Code</label>
                <input
                  {...register("postalCode")}
                  type="text"
                  placeholder="e.g. 00100"
                />
                <ErrorMsg msg={errors?.postalCode?.message} />
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Phone <span>*</span></label>
                <input
                  {...register("contactNo", {
                    required: "Phone number is required!",
                    pattern: {
                      value: /^07\d{8}$/,
                      message: "Phone number must be 10 digits and start with 07",
                    },
                  })}
                  type="text"
                  placeholder="e.g. 0712345678"
                  defaultValue={user?.contactNo || ""}
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>

            {/* Email */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Email address <span>*</span></label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                  })}
                  type="email"
                  placeholder="e.g. example@email.com"
                  defaultValue={user?.email || ""}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>

            {/* Order Notes */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Order notes (optional)</label>
                <textarea
                  {...register("orderNote")}
                  placeholder="Notes about your order, e.g. delivery instructions"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="button" onClick={onSubmit} className="btn btn-primary">
          Save Billing Info
        </button>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
