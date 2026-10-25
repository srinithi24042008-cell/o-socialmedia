export const Skeleton = ({
  className = '',
  variant = 'text',
}) => {
  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-8 w-3/4 rounded-lg',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-2xl',
    button: 'h-10 w-24 rounded-xl',
  };

  const variantClass = variants[variant] || variants.text;

  return (
    <div className={`skeleton ${variantClass} ${className}`} />
  );
};
