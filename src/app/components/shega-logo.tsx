interface ShegaLogoProps {
  variant?: 'full' | 'icon';
  size?: 'small' | 'medium' | 'large';
}

export function ShegaLogo({ variant = 'full', size = 'medium' }: ShegaLogoProps) {
  // Sudan flag colors
  const colors = {
    red: '#D21034',
    white: '#FFFFFF',
    black: '#000000',
    green: '#007A3D',
  };

  const sizes = {
    small: { icon: 32, text: 18 },
    medium: { icon: 48, text: 24 },
    large: { icon: 64, text: 32 },
  };

  const currentSize = sizes[size];

  if (variant === 'icon') {
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          className="transition-transform duration-300 hover:scale-110"
        >
          {/* Outer ring - Red */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={colors.red}
            strokeWidth="3"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Green geometric shape */}
          <path
            d="M 30 35 L 50 20 L 70 35 L 70 55 L 50 70 L 30 55 Z"
            fill={colors.green}
            className="transition-all duration-300"
          />
          
          {/* Black accent */}
          <path
            d="M 40 45 L 50 35 L 60 45 L 60 55 L 50 65 L 40 55 Z"
            fill={colors.black}
          />
          
          {/* White center dot */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill={colors.white}
            className="animate-pulse"
            style={{ animationDuration: '2s' }}
          />
          
          {/* Letter S stylized */}
          <text
            x="50"
            y="55"
            fontSize="12"
            fontWeight="900"
            fill={colors.red}
            textAnchor="middle"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            S
          </text>
        </svg>
      </div>
    );
  }

  // Full logo with text
  return (
    <div className="relative inline-flex items-center gap-3 group">
      {/* Icon part */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        className="transition-transform duration-300 group-hover:rotate-180"
      >
        {/* Outer ring - Red with gradient effect */}
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.red, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: colors.red, stopOpacity: 0.7 }} />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.green, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: colors.green, stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#redGradient)"
          strokeWidth="4"
          strokeDasharray="8 4"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        />
        
        {/* Green hexagonal shape */}
        <path
          d="M 30 35 L 50 20 L 70 35 L 70 55 L 50 70 L 30 55 Z"
          fill="url(#greenGradient)"
          className="transition-all duration-300"
        />
        
        {/* Black inner shape */}
        <path
          d="M 38 42 L 50 32 L 62 42 L 62 55 L 50 65 L 38 55 Z"
          fill={colors.black}
        />
        
        {/* White glow center */}
        <circle
          cx="50"
          cy="50"
          r="10"
          fill={colors.white}
          opacity="0.9"
        />
        
        {/* Stylized S */}
        <text
          x="50"
          y="57"
          fontSize="16"
          fontWeight="900"
          fill={colors.red}
          textAnchor="middle"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          S
        </text>
      </svg>

      {/* Text part */}
      <div
        style={{ fontSize: `${currentSize.text}px` }}
        className="flex items-center uppercase transition-all duration-300"
      >
        <span
          style={{ color: colors.red, fontFamily: 'system-ui, -apple-system, sans-serif' }}
          className="font-black tracking-tight transition-all duration-300 group-hover:tracking-wide"
        >
          SH
        </span>
        <span
          style={{ color: colors.green, fontFamily: 'system-ui, -apple-system, sans-serif' }}
          className="font-black tracking-tight transition-all duration-300 group-hover:scale-110"
        >
          E
        </span>
        <span
          style={{ color: colors.white, fontFamily: 'system-ui, -apple-system, sans-serif' }}
          className="font-black tracking-tight transition-all duration-300 group-hover:tracking-wide"
        >
          GGA
        </span>
      </div>
    </div>
  );
}
