import { icons } from './iconData';

export default function Icon({ name, className = '', ...rest }) {
    const icon = icons[name];
    if (!icon) return null;
    return (
        <svg
            className={`icon-svg ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={icon.viewBox}
            aria-hidden="true"
            focusable="false"
            {...rest}
        >
            {icon.paths.map((d, i) => (
                <path key={i} d={d} />
            ))}
        </svg>
    );
}
