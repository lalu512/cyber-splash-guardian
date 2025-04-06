
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				'cyber-blue': '#0CF',
				'cyber-blue-dark': '#0086a8',
				'cyber-black': '#000913',
				'cyber-dark-blue': '#001326',
				'cyber-gray': '#525a64',
				'cyber-matrix': '#00FF41',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'cyber-grid': 'linear-gradient(#0CF 1px, transparent 1px), linear-gradient(90deg, #0CF 1px, transparent 1px)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scan': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(100vh)'
					}
				},
				'marquee': {
					'from': {
						transform: 'translateX(0)'
					},
					'to': {
						transform: 'translateX(-50%)'
					}
				},
				'scan-v': {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100%)'
					}
				},
				'scan-h': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': {
						opacity: '0.7',
						filter: 'brightness(1.3)'
					}
				},
				'draw-line': {
					'0%': {
						strokeDashoffset: '1000',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'100%': {
						strokeDashoffset: '0',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fingerprint-scan': {
					'0%': {
						height: '0%',
						opacity: '0'
					},
					'10%': {
						height: '0%',
						opacity: '1'
					},
					'90%': {
						height: '100%',
						opacity: '1'
					},
					'100%': {
						height: '100%',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scan': 'scan 2s linear infinite',
				'marquee': 'marquee 20s linear infinite',
				'marquee-reverse': 'marquee 20s linear infinite reverse',
				'scan-v': 'scan-v 2s linear infinite',
				'scan-h': 'scan-h 2s linear infinite', 
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'draw-line': 'draw-line 2s forwards',
				'fade-in': 'fade-in 0.5s forwards',
				'fingerprint-scan': 'fingerprint-scan 2s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
