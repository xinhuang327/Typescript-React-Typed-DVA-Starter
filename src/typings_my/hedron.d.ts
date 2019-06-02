

/// <reference types="react" />

declare module "hedron" {
	interface ColumnProps extends React.Props<Column> {
		children?: Array<React.Component<any, any>>
		className?: string
		tagName?: string,
		theme?: Object,
		debug?: boolean,
		divisions?: number,
		fluid?: boolean,
		xs?: number,
		sm?: number,
		md?: number,
		lg?: number,
		xsShift?: number,
		smShift?: number,
		mdShift?: number,
		lgShift?: number,
		breakpoints?: Object,
		style?: React.CSSProperties
	}
	export class Column extends React.Component<ColumnProps, any> {
		render(): JSX.Element;
	}

	interface RowProps extends React.Props<Row> {
		children?: Array<React.Component<any, any>>
		className?: string,
		debug?: boolean,
		tagName?: string,
		theme?: Object,
		// grid props
		divisions?: number,
		// flex props
		alignContent?: string,
		alignItems?: string,
		alignSelf?: string,
		justifyContent?: string,
		order?: string
		style?: React.CSSProperties
	}
	export class Row extends React.Component<RowProps, any> {
		render(): JSX.Element;
	}

	interface PageProps extends React.Props<Page> {
		children?: Array<React.Component<any, any>>
		className?: string,
		tagName?: string,
		debug?: boolean,
		fluid?: boolean,
		width?: string
		style?: React.CSSProperties
	}
	export class Page extends React.Component<PageProps, any> {
		render(): JSX.Element;
	}

	interface HiddenProps extends React.Props<Hidden> {
		children?: Array<React.Component<any, any>>
		debug?: boolean,
		xs?: boolean,
		sm?: boolean,
		md?: boolean,
		lg?: boolean,
		breakpoints?: Object,
		style?: React.CSSProperties
	}
	export class Hidden extends React.Component<HiddenProps, any> {
		render(): JSX.Element;
	}

	// 	interface BreakpointProviderProps extends React.Props<BreakpointProvider> {
	//   sm: PropTypes.number,
	//   md: PropTypes.number,
	//   lg: PropTypes.number,
	// 	}
	// 	export class BreakpointProvider extends React.Component<BreakpointProviderProps, any> {
	// 		render(): JSX.Element;
	// 	}
}
