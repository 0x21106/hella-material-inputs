$(document).ready(function(){const l={globalInputClass:"hella-input",globalInputContainerClass:"hella-container",globalInputFluidClass:"hella-fluid",hellaPrefixDataName:"hella-prefix",hellaPrefixClass:"hella-prefix",hellaPlaceholderDataName:"hella-placeholder",hellaPlaceholderClass:"hella-placeholder",hellaPasswordToggleDataName:"hella-password-toggle",hellaPasswordToggleClass:"hella-password-toggle",hellaFileSelectorContainerClass:"hella-file-selector-container",hellaFileSelectorClass:"hella-file-selector",hellaFileNameClass:"hella-file-name",hellaFileIconClass:"file-selector-icon"},e=$("."+l.globalInputClass);$(e).each(function(e,a){const s=$(a).data(l.hellaPrefixDataName),t=$(a).data(l.hellaPlaceholderDataName),n=$(a).data(l.hellaPasswordToggleDataName),o=$(a).hasClass(l.globalInputFluidClass),c="file"==$(a).attr("type");$(a).wrap(function(){return"<div class='"+l.globalInputContainerClass+"'></div>"});const i=$(a).closest("."+l.globalInputContainerClass);if(s&&$(i).prepend("<span class='"+l.hellaPrefixClass+" "+s+"'></span>"),t&&$(i).append("<span class='"+l.hellaPlaceholderClass+"'>"+t+"</span>"),n&&("password"==$(a).attr("type")?$(i).prepend("<span class='"+l.hellaPasswordToggleClass+" fas fa-eye'></span>"):$(i).prepend("<span class='"+l.hellaPasswordToggleClass+" fas fa-eye-slash'></span>")),c){const e=o?l.globalInputFluidClass:"";$(a).wrap(function(){return"<div class='"+e+" "+l.hellaFileSelectorContainerClass+"'><label class='"+l.hellaFileSelectorClass+"'><span class='file-selector-icon fas fa-plus'></span></label></div>"})}});const a=$("."+l.hellaPlaceholderClass),s=$("."+l.hellaPasswordToggleClass),t=$("."+l.hellaFileSelectorClass).find("input[type=file].hella-input");$(a).on("click",function(){const e=$(this).closest("."+l.globalInputContainerClass),a=$(e).children("."+l.globalInputClass);$(a).focus()}),$(e).on("click blur focus",function(e){const a=$(this).closest("."+l.globalInputContainerClass),s=$(a).children("."+l.globalInputClass),t=$(a).children("."+l.hellaPlaceholderClass);"click"==e.type||"focus"==e.type?t&&function(l){$(l).removeClass("deactive").addClass("active")}(t):"blur"==e.type&&0==$(s).val().length&&function(l){$(l).removeClass("active").addClass("deactive")}(t)}),$(s).on("click",function(){!function(e){const a=$(e).children("."+l.globalInputClass),s=$(e).children("."+l.hellaPasswordToggleClass);"password"==$(a).attr("type")?($(a).attr("type","text"),$(s).removeClass().addClass(l.hellaPasswordToggleClass+" fas fa-eye-slash")):($(a).attr("type","password"),$(s).removeClass().addClass(l.hellaPasswordToggleClass+" fas fa-eye"))}($(this).closest("."+l.globalInputContainerClass))}),$(t).on("click change",function(e){if("change"==e.type){const e=function(e){const a=e.files;if(a.length>0){const s=$(e).closest("."+l.hellaFileSelectorClass).children("."+l.hellaFileIconClass);return $(s).addClass("active"),a}return null}(this);e&&function(e,a){let s="";$(e).each(function(l,a){e.length==l+1?s+=a.name:s+=a.name+", "});const t=$(a).closest("."+l.hellaFileSelectorClass),n=$(t).children("."+l.hellaFileNameClass),o=$(t).children(".hella-file-counter");n.length>0?($(n).text(s),$(o).text(e.length)):$(t).append('<span class="hella-file-name">'+s+"</span>").append('<span class="hella-file-counter">'+e.length+"</span>")}(e,this)}if("click"==e.type){const e=$(this).closest("."+l.hellaFileSelectorClass).children("."+l.hellaFileIconClass);if($(e).hasClass("active"))return function(e){const a=$(e).closest("."+l.hellaFileSelectorClass),s=$(a).children("."+l.hellaFileNameClass),t=$(a).children(".hella-file-counter"),n=$(e).closest("."+l.hellaFileSelectorClass).children("."+l.hellaFileIconClass);$(e).val(void 0),$(s).remove(),$(t).remove(),$(n).removeClass("active")}(this),!1}})});