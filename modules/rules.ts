export const defaultOrConstrained = (match: string): string =>
    '(' + (match ? match.replace(/(^<|>$)/g, '') : "[\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-_.@~%':|]+") + ')'

export type RegExpFactory = (match: any) => RegExp

export interface IRule {
    /* The name of the rule */
    name: string
    /* The regular expression used to find a token in a path definition */
    pattern: RegExp
    /* The derived regular expression to match a path */
    regex?: RegExp | RegExpFactory
}

const rules: IRule[] = [
    {
        name: 'url-parameter',
        pattern: /^:([\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-@_]*[\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-]{1})(<(.+?)>)?/,
        regex: (match: RegExpMatchArray) =>
            new RegExp(defaultOrConstrained(match[2]))
    },
    {
        name: 'url-parameter-splat',
        pattern: /^\*([\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-_]*[\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9]{1})/,
        regex: /([^?]*)/
    },
    {
        name: 'url-parameter-matrix',
        pattern: /^;([\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-_]*[\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-]{1})(<(.+?)>)?/,
        regex: (match: RegExpMatchArray) =>
            new RegExp(';' + match[1] + '=' + defaultOrConstrained(match[2]))
    },
    {
        name: 'query-parameter',
        pattern: /^(?:\?|&)(?::)?([\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9-_]*[\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9]{1})/
    },
    {
        name: 'delimiter',
        pattern: /^(\/|\?)/,
        regex: (match: RegExpMatchArray) => new RegExp('\\' + match[0])
    },
    {
        name: 'sub-delimiter',
        pattern: /^(!|&|-|_|\.|;)/,
        regex: (match: RegExpMatchArray) => new RegExp(match[0])
    },
    {
        name: 'fragment',
        pattern: /^([\u4E00-\u9FA5\uF900-\uFA2D-a-zA-Z0-9]+)/,
        regex: (match: RegExpMatchArray) => new RegExp(match[0])
    }
]

export default rules
