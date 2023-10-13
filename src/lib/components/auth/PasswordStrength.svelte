<script lang="ts">
	import { t } from 'svelte-i18n';

	export let password: string;

	const getPasswordStrength = (pass: string): 0 | 1 | 2 | 3 => {
		const hasNumber = /\d/.test(pass);
		const hasUpper = /[A-Z]/.test(pass);
		const hasLower = /[a-z]/.test(pass);
		const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass);
		const isLong = pass.length >= 12;

		if (hasNumber && hasLower && hasUpper && hasSpecial && isLong) {
			return 3;
		}

		if ((hasNumber && hasLower && hasUpper) || (isLong && (hasLower || hasUpper))) {
			return 2;
		}

		if ((hasNumber && (hasLower || hasUpper)) || isLong) {
			return 1;
		}

		return 0;
	};

	let strength = getPasswordStrength(password);

	$: strength = getPasswordStrength(password);
</script>

<div class="password-strength">
	<div class="strength-list">
		<div class="strength weak" class:active={strength >= 1} />
		<div class="strength fair" class:active={strength >= 2} />
		<div class="strength strong" class:active={strength >= 3} />
	</div>
	<span class:weak={strength >= 1} class:fair={strength >= 2} class:strong={strength >= 3}>
		{$t(`auth.password.strength.${strength}`)}
	</span>
</div>

<style lang="scss">
	.password-strength {
		margin-left: auto;
		width: fit-content;
		display: flex;
		flex-direction: column;
		margin-top: 0.75rem;
		gap: 0.25rem;

		span {
			font-size: var(--fs-200);
			color: hsl(var(--danger-800));
			text-align: right;

			&.weak {
				color: hsl(var(--danger-800));
			}

			&.fair {
				color: #f3e7ca;
			}

			&.strong {
				color: hsl(var(--success-800));
			}
		}

		.strength-list {
			display: flex;
			gap: 0.25rem;

			.strength {
				min-width: 2.5rem;
				height: 0.25rem;
				background: rgba(var(--base-300-rgb), 0.75);
				flex: 1;
				border-radius: 0.25rem;

				&.active {
					&.weak {
						background: hsl(var(--danger-500));
					}

					&.fair {
						background: #fbbf24;
					}

					&.strong {
						background: hsl(var(--success-500));
					}
				}
			}
		}
	}
</style>
