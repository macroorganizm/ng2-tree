import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  Inject,
  Renderer
} from '@angular/core';
import {NodeEditableEvent, NodeEditableEventAction} from './editable.type';

@Directive({
  selector: '[nodeEditable]'
})
export class NodeEditableDirective implements OnInit {
  @Input('nodeEditable')
  public nodeValue: string;

  @Output()
  public valueChanged: EventEmitter<NodeEditableEvent> = new EventEmitter<NodeEditableEvent>(false);

  constructor(
    @Inject(Renderer) private renderer: Renderer,
    @Inject(ElementRef) private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;
    this.renderer.invokeElementMethod(nativeElement, 'focus', []);
    this.renderer.setElementProperty(nativeElement, 'value', this.nodeValue);
  }

  @HostListener('keyup.enter', ['$event.target.value'])
  public applyNewValue(newNodeValue: string) {
    this.valueChanged.emit({type: 'keyup', value: newNodeValue});
  }

  @HostListener('blur', ['$event.target.value'])
  public applyNewValueByLoosingFocus(newNodeValue: string): void {
    this.valueChanged.emit({type: 'blur', value: newNodeValue});
  }

  @HostListener('keyup.esc')
  public cancelEditing(): void {
    this.valueChanged.emit({
      type: 'keyup',
      value: this.nodeValue,
      action: NodeEditableEventAction.Cancel
    });
  }
}
