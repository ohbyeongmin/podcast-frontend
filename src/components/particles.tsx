import React from "react";
import Particles from "react-tsparticles";
import musicalImg1 from "../images/musical-note-1.svg";
import musicalImg2 from "../images/musical-note-2.svg";
import musicalImg3 from "../images/musical-note-3.svg";
import musicalImg4 from "../images/musical-note-4.svg";

interface ParticlesProps {
	children?: JSX.Element;
}

export const ParticlesComponent: React.FC<ParticlesProps> = ({ children }) => {
	return (
		<>
			<Particles
				id="tsparticles"
				params={{
					background: {
						color: {
							value: "#f6dfeb",
						},
						position: "50% 50%",
						repeat: "no-repeat",
						size: "cover",
					},
					fullScreen: {
						enable: true,
						zIndex: -1,
					},
					particles: {
						number: {
							value: 8,
							density: {
								enable: true,
								value_area: 250,
							},
						},
						line_linked: {
							enable: false,
						},
						move: {
							attract: {
								rotate: {
									x: 600,
									y: 1200,
								},
							},
							direction: "top",
							enable: true,
							outModes: {
								default: "out",
							},
						},
						shape: {
							type: ["image"],
							image: [
								{
									src: musicalImg1,
									height: 10,
									width: 10,
								},
								{
									src: musicalImg2,
									height: 10,
									width: 10,
								},
								{
									src: musicalImg3,
									height: 10,
									width: 10,
								},
								{
									src: musicalImg4,
									height: 10,
									width: 10,
								},
							],
						},
						size: {
							value: 20,
						},
					},
					retina_detect: false,
				}}
			></Particles>
			{children}
		</>
	);
};
