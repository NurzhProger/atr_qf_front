import { ElementRef, AfterViewChecked, AfterContentInit, OnDestroy, EventEmitter, QueryList, TemplateRef, Renderer2, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { PrimeNGConfig, OverlayService } from 'primeng/api';
import { ControlValueAccessor } from '@angular/forms';
import { Scroller, ScrollerOptions } from 'primeng/scroller';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/ripple";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
export declare const AUTOCOMPLETE_VALUE_ACCESSOR: any;
export declare class AutoComplete implements AfterViewChecked, AfterContentInit, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    differs: IterableDiffers;
    config: PrimeNGConfig;
    overlayService: OverlayService;
    minLength: number;
    delay: number;
    style: any;
    panelStyle: any;
    styleClass: string;
    panelStyleClass: string;
    inputStyle: any;
    inputId: string;
    inputStyleClass: string;
    placeholder: string;
    readonly: boolean;
    disabled: boolean;
    scrollHeight: string;
    lazy: boolean;
    virtualScroll: boolean;
    virtualScrollItemSize: number;
    virtualScrollOptions: ScrollerOptions;
    maxlength: number;
    name: string;
    required: boolean;
    size: number;
    appendTo: any;
    autoHighlight: boolean;
    forceSelection: boolean;
    type: string;
    autoZIndex: boolean;
    baseZIndex: number;
    ariaLabel: string;
    dropdownAriaLabel: string;
    ariaLabelledBy: string;
    dropdownIcon: string;
    unique: boolean;
    group: boolean;
    completeOnFocus: boolean;
    showClear: boolean;
    field: string;
    dropdown: boolean;
    showEmptyMessage: boolean;
    dropdownMode: string;
    multiple: boolean;
    tabindex: number;
    dataKey: string;
    emptyMessage: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    autofocus: boolean;
    autocomplete: string;
    optionGroupChildren: string;
    optionGroupLabel: string;
    containerEL: ElementRef;
    inputEL: ElementRef;
    multiInputEL: ElementRef;
    multiContainerEL: ElementRef;
    dropdownButton: ElementRef;
    itemsViewChild: ElementRef;
    scroller: Scroller;
    templates: QueryList<any>;
    completeMethod: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    onUnselect: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    onClear: EventEmitter<any>;
    onKeyUp: EventEmitter<any>;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    onLazyLoad: EventEmitter<any>;
    _itemSize: number;
    get itemSize(): number;
    set itemSize(val: number);
    overlay: HTMLDivElement;
    itemsWrapper: HTMLDivElement;
    itemTemplate: TemplateRef<any>;
    emptyTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    groupTemplate: TemplateRef<any>;
    loaderTemplate: TemplateRef<any>;
    value: any;
    _suggestions: any[];
    onModelChange: Function;
    onModelTouched: Function;
    timeout: any;
    overlayVisible: boolean;
    documentClickListener: any;
    suggestionsUpdated: boolean;
    highlightOption: any;
    highlightOptionChanged: boolean;
    focus: boolean;
    filled: boolean;
    inputClick: boolean;
    inputKeyDown: boolean;
    noResults: boolean;
    differ: any;
    inputFieldValue: string;
    loading: boolean;
    scrollHandler: any;
    documentResizeListener: any;
    forceSelectionUpdateModelTimeout: any;
    listId: string;
    itemClicked: boolean;
    inputValue: string;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, differs: IterableDiffers, config: PrimeNGConfig, overlayService: OverlayService);
    get suggestions(): any[];
    set suggestions(val: any[]);
    ngAfterViewChecked(): void;
    handleSuggestionsChange(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    getOptionGroupChildren(optionGroup: any): any;
    getOptionGroupLabel(optionGroup: any): any;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onInput(event: Event): void;
    onInputClick(event: MouseEvent): void;
    search(event: any, query: string): void;
    selectItem(option: any, focus?: boolean): void;
    show(): void;
    clear(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    onOverlayAnimationEnd(event: AnimationEvent): void;
    onOverlayClick(event: any): void;
    appendOverlay(): void;
    resolveFieldData(value: any): any;
    restoreOverlayAppend(): void;
    alignOverlay(): void;
    hide(): void;
    handleDropdownClick(event: any): void;
    focusInput(): void;
    get emptyMessageLabel(): string;
    removeItem(item: any): void;
    onKeydown(event: any): void;
    onKeyup(event: any): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onInputChange(event: any): void;
    onInputPaste(event: ClipboardEvent): void;
    isSelected(val: any): boolean;
    findOptionIndex(option: any, suggestions: any): number;
    findOptionGroupIndex(val: any, opts: any[]): any;
    updateFilledState(): void;
    updateInputField(): void;
    bindDocumentClickListener(): void;
    isDropdownClick(event: any): boolean;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onWindowResize(): void;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoComplete, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutoComplete, "p-autoComplete", never, { "minLength": "minLength"; "delay": "delay"; "style": "style"; "panelStyle": "panelStyle"; "styleClass": "styleClass"; "panelStyleClass": "panelStyleClass"; "inputStyle": "inputStyle"; "inputId": "inputId"; "inputStyleClass": "inputStyleClass"; "placeholder": "placeholder"; "readonly": "readonly"; "disabled": "disabled"; "scrollHeight": "scrollHeight"; "lazy": "lazy"; "virtualScroll": "virtualScroll"; "virtualScrollItemSize": "virtualScrollItemSize"; "virtualScrollOptions": "virtualScrollOptions"; "maxlength": "maxlength"; "name": "name"; "required": "required"; "size": "size"; "appendTo": "appendTo"; "autoHighlight": "autoHighlight"; "forceSelection": "forceSelection"; "type": "type"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "ariaLabel": "ariaLabel"; "dropdownAriaLabel": "dropdownAriaLabel"; "ariaLabelledBy": "ariaLabelledBy"; "dropdownIcon": "dropdownIcon"; "unique": "unique"; "group": "group"; "completeOnFocus": "completeOnFocus"; "showClear": "showClear"; "field": "field"; "dropdown": "dropdown"; "showEmptyMessage": "showEmptyMessage"; "dropdownMode": "dropdownMode"; "multiple": "multiple"; "tabindex": "tabindex"; "dataKey": "dataKey"; "emptyMessage": "emptyMessage"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "autofocus": "autofocus"; "autocomplete": "autocomplete"; "optionGroupChildren": "optionGroupChildren"; "optionGroupLabel": "optionGroupLabel"; "itemSize": "itemSize"; "suggestions": "suggestions"; }, { "completeMethod": "completeMethod"; "onSelect": "onSelect"; "onUnselect": "onUnselect"; "onFocus": "onFocus"; "onBlur": "onBlur"; "onDropdownClick": "onDropdownClick"; "onClear": "onClear"; "onKeyUp": "onKeyUp"; "onShow": "onShow"; "onHide": "onHide"; "onLazyLoad": "onLazyLoad"; }, ["templates"], never, false>;
}
export declare class AutoCompleteModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoCompleteModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AutoCompleteModule, [typeof AutoComplete], [typeof i1.CommonModule, typeof i2.InputTextModule, typeof i3.ButtonModule, typeof i4.SharedModule, typeof i5.RippleModule, typeof i6.ScrollerModule, typeof i7.AutoFocusModule], [typeof AutoComplete, typeof i4.SharedModule, typeof i6.ScrollerModule, typeof i7.AutoFocusModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AutoCompleteModule>;
}
