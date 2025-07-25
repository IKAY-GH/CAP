import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";

import "./signUp.css";

const validationSchema = yup.object({
  pseudo: yup
    .string()
    .required("Il faut préciser votre pseudo")
    .min(2, "Un minimum de 2 caractères est demandé"),
  first_name: yup
    .string()
    .required("Il faut préciser votre nom")
    .min(2, "Un minimum de 2 caractères est demandé"),
  last_name: yup
    .string()
    .required("Il faut préciser votre prénom")
    .min(2, "Un minimum de 2 caractères est demandé !"),
  email: yup
    .string()
    .required("Il faut préciser votre email")
    .email("l'email n'est pas valide"),
  password: yup
    .string()
    .required("Il faut préciser votre password")
    .min(6, "Mot de passe trop court"),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "La confirmation du mot de passe est incorrecte",
    )
    .required("Confirmez votre mot de passe"),
});

type FormData = yup.InferType<typeof validationSchema>;

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/inscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: data.pseudo,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        reset();
        alert(`Bienvenu ${data.pseudo} !`);
        navigate("/");
      } else {
        setError(result.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="inscription-container">
      <h2>Inscription</h2>

      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          {...register("pseudo")}
          type="text"
          id="pseudo"
          autoComplete="userName"
          required
          aria-describedby="pseudo_help"
          disabled={isLoading}
        />
        {errors.pseudo && <p className="form-error">{errors.pseudo.message}</p>}
        <p id="pseudo_help">Votre pseudo doit faire 2 caractères min.</p>

        <label htmlFor="nom">Nom</label>
        <input
          {...register("first_name")}
          type="text"
          id="nom"
          autoComplete="family-name"
          required
          disabled={isLoading}
        />
        {errors.first_name && (
          <p className="form-error">{errors.first_name.message}</p>
        )}

        <label htmlFor="prenom">Prenom</label>
        <input
          {...register("last_name")}
          type="text"
          id="prenom"
          autoComplete="given-name"
          required
          disabled={isLoading}
        />
        {errors.last_name && (
          <p className="form-error">{errors.last_name.message}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          autoComplete="email"
          required
          disabled={isLoading}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="new-password"
          required
          disabled={isLoading}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <label htmlFor="confirm_password">Confirmez le mot de passe</label>
        <input
          {...register("confirm_password")}
          type="password"
          id="confirm_password"
          autoComplete="new-password"
          required
          disabled={isLoading}
        />
        {errors.confirm_password && (
          <p className="form-error">{errors.confirm_password.message}</p>
        )}

        <div>
          <button id="btn-valide" type="submit" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "Inscription"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default SignUp;
