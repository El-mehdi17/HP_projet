import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Login attempt with:", formData);
      // Here you would typically make your API call
      alert("Connexion réussie !");
    } catch (error) {
      console.error("Login error:", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <LogIn size={32} color="#4f46e5" />
          </div>
          <h2 style={styles.title}>Connexion</h2>
          <p style={styles.subtitle}>Bienvenue ! Veuillez vous connecter</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Champ Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Adresse email
            </label>
            <div style={styles.inputWrapper}>
              <Mail size={18} color="#9ca3af" style={styles.inputIcon} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                style={{
                  ...styles.input,
                  ...(errors.email && styles.inputError)
                }}
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" style={styles.errorText}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Mot de passe
            </label>
            <div style={styles.inputWrapper}>
              <Lock size={18} color="#9ca3af" style={styles.inputIcon} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                style={{
                  ...styles.input,
                  ...(errors.password && styles.inputError)
                }}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" style={styles.errorText}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Options supplémentaires */}
          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              Se souvenir de moi
            </label>
            <button type="button" style={styles.forgotButton}>
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              ...(isLoading && styles.submitButtonDisabled)
            }}
          >
            {isLoading ? (
              <span style={styles.loader}></span>
            ) : (
              "Se connecter"
            )}
          </button>

          {/* Lien d'inscription */}
          <p style={styles.signupText}>
            Pas encore de compte ?{" "}
            <button type="button" style={styles.signupButton}>
              S'inscrire
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    transition: "transform 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  iconContainer: {
    display: "inline-flex",
    padding: "12px",
    background: "#eef2ff",
    borderRadius: "50%",
    marginBottom: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
  },
  input: {
    width: "100%",
    padding: "10px 12px 10px 40px",
    fontSize: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    color: "#9ca3af",
  },
  errorText: {
    fontSize: "12px",
    color: "#ef4444",
    margin: 0,
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#4b5563",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
  },
  forgotButton: {
    background: "none",
    border: "none",
    color: "#4f46e5",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  submitButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    marginTop: "8px",
  },
  submitButtonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  loader: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,.3)",
    borderRadius: "50%",
    borderTop: "3px solid white",
    animation: "spin 1s ease-in-out infinite",
  },
  signupText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  },
  signupButton: {
    background: "none",
    border: "none",
    color: "#4f46e5",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

// Ajouter l'animation CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Login;