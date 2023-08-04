package com.testmeasure

import android.graphics.Color
import android.view.View
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class TestMeasureViewManager : ViewGroupManager<TestMeasureView>() {
  override fun getName() = "TestMeasureView"

  override fun createViewInstance(reactContext: ThemedReactContext): TestMeasureView {
    return TestMeasureView(reactContext)
  }

  @ReactProp(name = "anchorRef", defaultInt = View.NO_ID)
  fun setAnchorRef(view: TestMeasureView, anchorRef: Int) {
    view.setAnchorRef(anchorRef)
  }

  @ReactProp(name = "templateRef", defaultInt = View.NO_ID)
  fun setTemplateRef(view: TestMeasureView, templateRef: Int) {
    view.setTemplateRef(templateRef)
  }
}
