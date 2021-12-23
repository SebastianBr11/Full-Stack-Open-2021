import styled, { css } from 'styled-components'

const Button = styled.button`
	cursor: pointer;
	padding-block: 0.6rem;
	border-radius: 0.2rem;
	padding-inline: 0.85rem;
	background-color: hsl(var(--gray-800));
	border: 0;
	color: hsl(var(--gray-200));
	font-weight: bold;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	&:hover {
		background-color: hsl(var(--gray-750));
	}
	${({ look }) => {
		switch (look) {
			case 'dangerous':
				return css`
					color: hsl(var(--orange-500));
					border: 1px solid hsl(var(--orange-500));
				`
			case 'success':
				return css`
					color: hsl(var(--green-500));
					border: 1px solid hsl(var(--green-500));
				`
		}
	}}
`

export default Button
