# Component Design Specifications

## Design System Architecture

### 1. Core Design Tokens

```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;

  /* Neutral Colors */
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;

  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;

  /* Typography */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Spacing Scale */
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */

  /* Border Radius */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.5rem; /* 8px */
  --radius-lg: 0.75rem; /* 12px */
  --radius-xl: 1rem; /* 16px */
  --radius-2xl: 1.5rem; /* 24px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl:
    0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 250ms ease-out;
  --transition-slow: 350ms ease-out;
}
```

## 2. Component Library Structure

### 2.1 Base Components

#### Button Component

```jsx
const Button = ({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500",
    outline:
      "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-primary-500",
    ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500",
    danger: "bg-error text-white hover:bg-error-600 focus:ring-error-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner className="mr-2" size="sm" />}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

#### Input Component

```jsx
const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = "default",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";

  const variants = {
    default:
      "border-neutral-300 focus:border-primary-500 focus:ring-primary-500",
    error: "border-error focus:border-error focus:ring-error",
    success: "border-success focus:border-success focus:ring-success",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          className={`${baseClasses} ${variants[error ? "error" : variant]} ${sizes[size]} ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};
```

#### Card Component

```jsx
const Card = ({
  children,
  hover = false,
  interactive = false,
  className = "",
  ...props
}) => {
  const baseClasses = "bg-white rounded-xl shadow-md border border-neutral-200";
  const hoverClasses = hover
    ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    : "";
  const interactiveClasses = interactive
    ? "cursor-pointer active:scale-95"
    : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${interactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

### 2.2 Search Components

#### SearchInput Component

```jsx
const SearchInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  suggestions = [],
  showSuggestions = false,
  loading = false,
  ...props
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0) {
        e.preventDefault();
        onChange(suggestions[focusedIndex]);
      } else {
        onSubmit(e);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-neutral-400" />
        </div>
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-10"
          {...props}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === focusedIndex
                  ? "bg-primary-50 text-primary-700"
                  : "hover:bg-neutral-50"
              }`}
              onClick={() => onChange(suggestion)}
            >
              <div className="flex items-center space-x-3">
                <Avatar src={suggestion.avatar_url} size="sm" />
                <div>
                  <div className="font-medium text-neutral-900">
                    {suggestion.login}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {suggestion.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

#### SearchFilters Component

```jsx
const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset all
        </Button>
      </div>

      <FilterSection>
        <FilterLabel>Location</FilterLabel>
        <LocationFilter
          value={filters.location}
          onChange={(location) => onFilterChange("location", location)}
        />
      </FilterSection>

      <FilterSection>
        <FilterLabel>Followers</FilterLabel>
        <RangeFilter
          min={0}
          max={1000000}
          value={filters.followers}
          onChange={(followers) => onFilterChange("followers", followers)}
          formatValue={(value) => `${value.toLocaleString()}+`}
        />
      </FilterSection>

      <FilterSection>
        <FilterLabel>Repositories</FilterLabel>
        <RangeFilter
          min={0}
          max={1000}
          value={filters.repositories}
          onChange={(repositories) =>
            onFilterChange("repositories", repositories)
          }
          formatValue={(value) => `${value}+`}
        />
      </FilterSection>
    </div>
  );
};
```

### 2.3 User Components

#### UserCard Component

```jsx
const UserCard = ({ user, onFollow, onPreview, onViewProfile }) => {
  return (
    <Card hover interactive className="group">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar
              src={user.avatar_url}
              alt={user.login}
              size="lg"
              className="ring-2 ring-neutral-100 group-hover:ring-primary-200 transition-all"
            />
            <div>
              <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                {user.name || user.login}
              </h3>
              <p className="text-sm text-neutral-500">@{user.login}</p>
            </div>
          </div>
          <FollowButton
            userId={user.id}
            isFollowing={user.is_following}
            onFollow={onFollow}
            size="sm"
          />
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-neutral-600 line-clamp-2">{user.bio}</p>
        )}

        {/* Metadata */}
        <div className="space-y-2">
          {user.location && (
            <div className="flex items-center text-sm text-neutral-500">
              <LocationIcon className="h-4 w-4 mr-2" />
              {user.location}
            </div>
          )}
          {user.company && (
            <div className="flex items-center text-sm text-neutral-500">
              <CompanyIcon className="h-4 w-4 mr-2" />
              {user.company}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-200">
          <StatItem label="Followers" value={user.followers} />
          <StatItem label="Following" value={user.following} />
          <StatItem label="Repos" value={user.public_repos} />
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onPreview(user)}
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onViewProfile(user)}
          >
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center">
    <div className="font-semibold text-neutral-900">
      {value.toLocaleString()}
    </div>
    <div className="text-xs text-neutral-500">{label}</div>
  </div>
);
```

#### Avatar Component

```jsx
const Avatar = ({ src, alt, size = "md", className = "", fallback }) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
    "2xl": "h-20 w-20",
  };

  if (imageError || !src) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-neutral-200 flex items-center justify-center ${className}`}
      >
        <span className="text-neutral-500 font-medium">
          {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
};
```

### 2.4 Layout Components

#### ResponsiveGrid Component

```jsx
const ResponsiveGrid = ({
  children,
  minItemWidth = 320,
  gap = 24,
  className = "",
}) => {
  return (
    <div
      className={`grid gap-${gap / 4} ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
```

#### Pagination Component

```jsx
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </PaginationButton>
      )}

      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>

      {getVisiblePages().map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? "primary" : "outline"}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>

      {showFirstLast && (
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </PaginationButton>
      )}
    </div>
  );
};

const PaginationButton = ({ children, ...props }) => (
  <Button size="sm" {...props}>
    {children}
  </Button>
);
```

## 3. Animation & Micro-interactions

### 3.1 Loading States

```jsx
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <div className="h-12 w-12 bg-neutral-200 rounded-full animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-neutral-200 rounded animate-pulse" />
      <div className="h-3 bg-neutral-200 rounded w-5/6 animate-pulse" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="h-8 bg-neutral-200 rounded animate-pulse" />
      <div className="h-8 bg-neutral-200 rounded animate-pulse" />
      <div className="h-8 bg-neutral-200 rounded animate-pulse" />
    </div>
  </div>
);
```

### 3.2 Transitions

```css
/* Page Transitions */
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 300ms,
    transform 300ms;
}

.page-transition-exit {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition:
    opacity 300ms,
    transform 300ms;
}

/* Card Hover Effects */
.card-hover {
  transition: all var(--transition-normal);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Button Interactions */
.button-interaction {
  position: relative;
  overflow: hidden;
}

.button-interaction::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
}

.button-interaction:active::before {
  width: 300px;
  height: 300px;
}
```

## 4. Accessibility Features

### 4.1 Focus Management

```jsx
const FocusTrap = ({ children, active = true }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
};
```

### 4.2 Screen Reader Support

```jsx
const LiveRegion = ({ children, politeness = "polite" }) => (
  <div aria-live={politeness} aria-atomic="true" className="sr-only">
    {children}
  </div>
);

const Announcer = ({ message }) => <LiveRegion>{message}</LiveRegion>;
```

## 5. Performance Optimizations

### 5.1 Virtual Scrolling

```jsx
const VirtualizedList = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length,
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: "100%",
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

This comprehensive component design specification provides a solid foundation for building a modern, accessible, and performant user interface for the GitHub Users Search Engine.
