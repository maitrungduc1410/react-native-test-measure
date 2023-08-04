package com.testmeasure

import android.view.View
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.views.view.ReactViewGroup

class TestMeasureView (private val mContext: ReactContext): ReactViewGroup(mContext) {
  private var anchorView: View? = null
  private var anchorRef: Int? = null
  private var templateView: View? = null
  private var templateRef: Int? = null

  fun setAnchorRef(anchorRef: Int) {
    if (this.anchorRef == anchorRef) {
      return
    }

    this.anchorRef = anchorRef

    val uiManager: UIManagerModule? = mContext.getNativeModule(
      UIManagerModule::class.java)
    if (uiManager != null) {
      anchorView = uiManager.resolveView(anchorRef)
    }
  }

  fun setTemplateRef(templateRef: Int) {
    if (this.templateRef == templateRef) {
      return
    }

    this.templateRef = templateRef

    val uiManager: UIManagerModule? = mContext.getNativeModule(UIManagerModule::class.java)
    if (uiManager != null) {
      templateView = uiManager.resolveView(templateRef)

      if (anchorView != null) {
        showTooltip()
      }
    }
  }

  private fun showTooltip() {
    println(templateView)
    println(templateView?.width)
    println(templateView?.height)

    // throw error
    templateView!!.measure(templateView!!.width, templateView!!.height)

    // also throw error
    //   templateView!!.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED)
  }
}
