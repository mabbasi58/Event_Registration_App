import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    getAuth,
} from "firebase/auth";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const auth = getAuth();

    const validateForm = () => {
        const errors = {};

        // Validate name, email, password, and address (all required)
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }
        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        // Validate email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
            errors.email = "Invalid email format";
        }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setRegistrationSuccess(false);

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await updateProfile(res.user, {
                displayName: formData.name,
            });

            const userDocRef = doc(db, "users", res.user.uid);
            await setDoc(userDocRef, {
                uid: res.user.uid,
                displayName: formData.name,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
            });

            setRegistrationSuccess(true);
            setLoading(false);

            // Clear the form on success
            setFormData({
                name: "",
                email: "",
                password: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
            });
        } catch (err) {
            console.error(err);
            if (err.code === "auth/invalid-email") {
                setError("Invalid email format");
            } else {
                setError("Registration successful!");
            }
            setLoading(False);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Event Registration App</span>
                <span className="title">Contact Information</span>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {error && error.name && <span className="error">{error.name}</span>}

                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {error && error.email && <span className="error">{error.email}</span>}

                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {error && error.password && (
                        <span className="error">{error.password}</span>
                    )}

                    <input
                        required
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {error && error.address && (
                        <span className="error">{error.address}</span>
                    )}

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                    />
                    <h2 className="conference-heading">Conference Registration</h2>
                    <p className="meals-description">
                        All Full Conference Registration fees include the following meals:
                    </p>
                    <ul className="meals-list">
                        <li>Monday: Continental breakfast and lunch</li>
                        <li>Tuesday: Continental breakfast and lunch</li>
                        <li>Wednesday: Continental breakfast</li>
                    </ul>

                    <h>Dietary Needs</h>
                    <label>
                        <input
                            type="checkbox"
                            name="dietaryNeeds"
                            value="vegetarian"
                            checked={formData.dietaryNeeds === "vegetarian"}
                            onChange={handleInputChange}
                        /> Vegetarian
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dietaryNeeds"
                            value="vegan"
                            checked={formData.dietaryNeeds === "vegan"}
                            onChange={handleInputChange}
                        /> Vegan
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dietaryNeeds"
                            value="glutenFree"
                            checked={formData.dietaryNeeds === "Dairy Free Meals"}
                            onChange={handleInputChange}
                        /> Gluten-Free
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dietaryNeeds"
                            value="glutenFree"
                            checked={formData.dietaryNeeds === "glutenFree"}
                            onChange={handleInputChange}
                        /> Gluten-Free
                    </label>
                    <h>Previous Attendance</h>
                    <p>Check the box if you have attended previous conferences:</p>
                    <label>
                        <input
                            type="checkbox"
                            name="previousAttendance"
                            checked={formData.previousAttendance}
                            onChange={(e) => setFormData({ ...formData, previousAttendance: e.target.checked })}
                        /> I have attended previous conferences
                    </label>


                    <button disabled={loading}>Submit</button>
                    {loading }
                    {registrationSuccess && (
                        <span className="success">Registration successful!</span>
                    )}
                    {error && !registrationSuccess && (
                        <span className="error">{error}</span>
                    )}
                </form>

            </div>
        </div>
    );
};

export default RegistrationForm;